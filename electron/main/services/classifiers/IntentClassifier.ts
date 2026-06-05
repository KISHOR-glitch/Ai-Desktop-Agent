import * as z from 'zod'
import { BaseClassifier } from './BaseClassifier'
import { IntelligenceService } from '@electron/services/intelligence/IntelligenceService'
import { PromptLoader } from '@electron/services/intelligence/PromptLoader'
import { IntentClassificationSchema } from '@electron/services/agent/schemas'
import { createLogger } from '@electron/utils/logger'

const log = createLogger('IntentClassifier')

/** Pre-computed JSON schema for structured output */
const intentJsonSchema = z.toJSONSchema(IntentClassificationSchema) as Record<string, unknown>

export interface IntentInput {
  command: string
  /** Recent conversation history for context-aware classification */
  recentHistory?: Array<{ role: string; text: string }>
}

/** Intent classification result */
export type IntentResult = 'chat' | 'direct' | 'action'

// ═══════════════════════════════════════════════════════════════
//  Keyword patterns for pre-classification (no LLM needed)
// ═══════════════════════════════════════════════════════════════

/** Commands that can be executed via shell/hotkey without looking at the screen */
const DIRECT_PATTERNS: RegExp[] = [
  // App lifecycle
  /^(open|launch|start|run)\s+/i,
  /^(close|quit|exit|kill|stop|end)\s+/i,
  /^(minimize|maximise|maximize|restore)\s+/i,
  // Volume & media (skip "play" as it often means opening a site/app and clicking)
  /\b(mute|unmute|volume\s*(up|down)|set\s*volume)\b/i,
  /\b(pause|next\s*track|previous\s*track|skip\s*song)\b/i,
  // System operations
  /\b(shutdown|restart|reboot|sleep|lock|log\s*off|sign\s*out)\b/i,
  // File operations
  /\b(create|make|delete|remove|move|copy|rename)\s+(a\s+)?(file|folder|directory)\b/i,
  // Search (web or files)
  /^(search|google|look\s*up|find\s*out|what('?s| is| are)\s+(the\s+)?(weather|news|time|date|price))\b/i,
  /^(find|locate|where\s*is)\s+(my\s+)?/i,
  // System info
  /\b(battery|disk\s*space|ram|cpu|memory|ip\s*address|uptime)\b/i,
  /^(what\s*time|what('?s| is)\s*(the\s*)?time)\b/i,
  // Window management hotkeys
  /^(show\s*desktop|switch\s*(app|window)|alt\s*tab)\b/i,
  /^(take\s*a?\s*screenshot|screen\s*capture)\b/i,
  // Common app opens with no verb (e.g. "spotify", "chrome", "notepad")
  /^(spotify|chrome|firefox|edge|notepad|calculator|explorer|terminal|cmd|powershell|vscode|code|discord|slack|telegram|whatsapp|steam|epic|brave|opera|vlc|obs)\s*$/i,
]

/** Commands that require looking at the screen (GUI interaction) */
const ACTION_PATTERNS: RegExp[] = [
  /^(click|tap|press|hit)\s+(on\s+|the\s+)?/i,
  /\b(scroll)\s*(up|down|left|right)\b/i,
  /\b(what('?s| is)\s+(on\s+)?(my\s+)?screen)\b/i,
  /\b(read\s+(the\s+)?screen|look\s+at\s+(the\s+)?screen)\b/i,
  /\b(type|write|enter|fill\s*in|input)\s+(in|into|on|to)\s+/i,
  /\b(drag|drop|right[\s-]*click|double[\s-]*click)\b/i,
  /\b(select|highlight|copy|paste)\s+(the\s+|this\s+)?text\b/i,
]

/** Simple greetings / chit-chat that never need OS interaction */
const CHAT_PATTERNS: RegExp[] = [
  /^(hi|hello|hey|yo|sup|howdy|greetings|good\s*(morning|afternoon|evening|night))[\s!.?]*$/i,
  /^(how\s*are\s*you|what('?s|\s*is)\s*up|how('?s|\s*is)\s*it\s*going)[\s!.?]*$/i,
  /^(thanks?|thank\s*you|thx|ty)[\s!.?]*$/i,
  /^(bye|goodbye|see\s*you|later|good\s*night)[\s!.?]*$/i,
  /^(who\s*are\s*you|what('?s|\s*is)\s*your\s*name)[\s!.?]*$/i,
  /^(tell\s*me\s*a\s*joke|joke)[\s!.?]*$/i,
]

/**
 * Attempt fast keyword-based classification before calling the LLM.
 * Returns null if no pattern matches (LLM classification needed).
 */
function preClassify(command: string): IntentResult | null {
  const trimmed = command.trim()

  // Chat patterns first (greetings are very specific)
  for (const pattern of CHAT_PATTERNS) {
    if (pattern.test(trimmed)) return 'chat'
  }

  // Direct patterns (app open/close, volume, search, etc.)
  for (const pattern of DIRECT_PATTERNS) {
    if (pattern.test(trimmed)) return 'direct'
  }

  // Action patterns (screen interaction)
  for (const pattern of ACTION_PATTERNS) {
    if (pattern.test(trimmed)) return 'action'
  }

  return null
}

/**
 * IntentClassifier — determines how to handle a user command.
 *
 * Three categories:
 * - `chat`   — conversational, no OS interaction needed
 * - `direct` — simple OS action via shell command or hotkey (no screenshot needed)
 * - `action` — needs screen interaction (clicking, reading, navigating GUI)
 *
 * Classification priority:
 * 1. **Keyword pre-classification** — catches common patterns instantly (zero latency)
 * 2. **LLM structured output** — uses JSON schema for reliable 3-way classification
 * 3. **LLM plain-text fallback** — parses intent from unstructured LLM response
 * 4. **Fallback to `direct`** — when all else fails, attempt action over chat
 */
export class IntentClassifier extends BaseClassifier<IntentInput, IntentResult> {
  readonly name = 'intent'

  private intelligence: IntelligenceService
  private promptLoader: PromptLoader

  constructor(intelligence: IntelligenceService, promptLoader: PromptLoader) {
    super()
    this.intelligence = intelligence
    this.promptLoader = promptLoader
  }

  /**
   * Classify the user command into one of three categories.
   *
   * Uses a multi-tier approach:
   * 1. Keyword pre-classification (instant, no LLM call)
   * 2. LLM structured output (reliable with capable models)
   * 3. LLM plain-text fallback (for models without structured output support)
   * 4. Falls back to `'direct'` if everything fails (prefer action over silence)
   */
  async classify(input: IntentInput): Promise<IntentResult> {
    // ── Tier 1: Keyword pre-classification (zero latency) ──
    const preResult = preClassify(input.command)
    if (preResult !== null) {
      log.info(`"${input.command}" → ${preResult.toUpperCase()} (keyword match)`)
      return preResult
    }

    // ── Tier 2: LLM structured output ──
    try {
      // Build context from recent history (last 4 messages)
      let contextBlock = ''
      if (input.recentHistory && input.recentHistory.length > 0) {
        const recent = input.recentHistory.slice(-4)
        const lines = recent.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text.slice(0, 200)}`)
        contextBlock = `\n\nRecent conversation:\n${lines.join('\n')}\n`
      }

      const prompt = this.promptLoader.load('intent_classifier', {
        context: contextBlock,
        command: input.command,
      })

      const response = await this.intelligence.classifyStructured(
        prompt,
        intentJsonSchema,
      )

      const parsed = IntentClassificationSchema.parse(JSON.parse(response))
      const result = parsed.intent
      log.info(`"${input.command}" → ${result.toUpperCase()} (LLM structured)`)
      return result
    } catch (err) {
      log.warn('Structured classification failed, trying plain-text fallback:', err)
    }

    // ── Tier 3: LLM plain-text fallback ──
    try {
      let contextBlock = ''
      if (input.recentHistory && input.recentHistory.length > 0) {
        const recent = input.recentHistory.slice(-4)
        const lines = recent.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text.slice(0, 200)}`)
        contextBlock = `\n\nRecent conversation:\n${lines.join('\n')}\n`
      }

      const prompt = this.promptLoader.load('intent_classifier', {
        context: contextBlock,
        command: input.command,
      })

      const plainResponse = await this.intelligence.classify(
        prompt + '\n\nRespond with ONLY one word: "chat", "direct", or "action". Nothing else.',
      )

      const word = plainResponse.trim().toLowerCase().replace(/[^a-z]/g, '')
      if (word === 'chat' || word === 'direct' || word === 'action') {
        log.info(`"${input.command}" → ${word.toUpperCase()} (LLM plain-text)`)
        return word
      }

      // Try to find the intent word anywhere in the response
      if (plainResponse.toLowerCase().includes('direct')) {
        log.info(`"${input.command}" → DIRECT (LLM plain-text, extracted)`)
        return 'direct'
      }
      if (plainResponse.toLowerCase().includes('action')) {
        log.info(`"${input.command}" → ACTION (LLM plain-text, extracted)`)
        return 'action'
      }
      if (plainResponse.toLowerCase().includes('chat')) {
        log.info(`"${input.command}" → CHAT (LLM plain-text, extracted)`)
        return 'chat'
      }
    } catch (err2) {
      log.warn('Plain-text classification also failed:', err2)
    }

    // ── Tier 4: Default to direct (prefer attempting action over doing nothing) ──
    log.warn(`All classification failed for "${input.command}", defaulting to DIRECT`)
    return 'direct'
  }
}
