/**
 * Config defaults — factory defaults for all config sections.
 *
 * Used on first launch and as fallbacks when loading a saved config
 * that may be missing newly-added fields.
 */

import { app } from 'electron'
import type { AppConfig } from './schema'

export const defaultConfig: AppConfig = {
  ui: {
    positionSide: 'right',
    openDevTools: false,
    logLevel: 'debug',
    debugLog: false,
    soundEnabled: true,
    soundVolume: 0.5,
  },
  llm: {
    provider: 'openai',
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama',
    textModel: 'mistral',
    visionModel: 'mistral',
    classifierModel: 'mistral',
  },
  generation: {
    chatTemperature: 0.7,
    chatTopP: 0.95,
    chatTopK: 40,
    chatMaxTokens: 2048,
    visionTemperature: 0.2,
    visionMaxTokens: 1024,
  },
  tts: {
    provider: 'elevenlabs',
    apiKey: 'sk_80966be051180003d9c37e2745b85659bee521765a4f705e',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    model: 'eleven_flash_v2_5',
    enabled: true,
  },
  stt: {
    enabled: true,
    language: 'en',
    wakeWordEnabled: true,
    customWakeWord: '',
  },
  agent: {
    maxIterations: 15,
    maxConsecutiveFailures: 3,
    preActionDelay: 200,
    postActionDelay: 800,
    maxContextMessages: 40,
    commandTimeout: 30_000,
    screenshotMaxWidth: 1280,
    screenshotQuality: 80,
    thoughtsTransitionDelay: 500,
    streamWordsPerChunk: 3,
    streamChunkDelay: 30,
  },
  hotkey: 'Ctrl+Space',
  activePersonaId: 'atlas-default',
}
