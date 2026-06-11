<p align="center">
  <img src="build/icon.png" width="128" height="128" alt="Atlas" />
</p>

<h1 align="center">AI Desktop Agent</h1>

<p align="center">
  <b>Privacy-First Desktop Agent with Local LLM.</b><br/>
  Run AI locally with Ollama • No cloud dependency • Complete control over your data.
</p>

<p align="center">
  <a href="https://github.com/KISHOR-glitch/Ai-Desktop-Agent/releases"><img src="https://img.shields.io/badge/download-v0.2.3-7c3aed?style=for-the-badge&logo=windows&logoColor=white" alt="Download" /></a>&nbsp;
  <a href="#-getting-started"><img src="https://img.shields.io/badge/get%20started-→-0ea5e9?style=for-the-badge" alt="Get Started" /></a>&nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0-gray?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Windows-supported-brightgreen?style=flat-square&logo=windows&logoColor=white" alt="Windows" />
  <img src="https://img.shields.io/badge/macOS%20%26%20Linux-coming%20soon-yellow?style=flat-square" alt="macOS & Linux" />
  <img src="https://img.shields.io/badge/privacy--first-local%20only-blue?style=flat-square" alt="Privacy" />
</p>

<p align="center"><img src="docs/preview.png" width="300" alt="Atlas Demo" /></p>

---

> **📚 Educational Implementation (v0.2.3)**
> 
> - 🔒 **Privacy-First:** Local LLM integration via Ollama — zero cloud dependencies
> - 🤖 **LLM Support:** Ollama (local models), Gemini API, OpenAI (optional)
> - 🖥 **Screen Control:** Vision-based automation with desktop control capabilities
> - 💻 **Platform:** Windows (primary). macOS & Linux compatible
> - 🎓 **Academic Project:** Enhanced from original with local-first architecture

---

## What is AI Desktop Agent?

AI Desktop Agent is a **privacy-first, locally-powered desktop automation system** that keeps all data on your machine. Press `Ctrl+Space`, speak or type your commands — the agent understands your screen context and executes tasks end-to-end without sending data to the cloud.

Think of it as an **offline-first copilot for your entire OS** — with the security and autonomy you deserve.

- 🖥 **Sees your screen** — captures what's on your display and understands the context
- 🧠 **Thinks before it acts** — plans multi-step tasks and shows progress in real time
- 🖱 **Controls your computer** — mouse, keyboard, and terminal — all automated
- 🎯 **Shows what it's doing** — you can see the agent's cursor moving on screen
- 🔍 **Searches the web** — finds answers and brings them back, no tab-switching needed
- 📂 **Finds your files** — searches local files and folders by name, right from chat
- 🗣 **Speaks to you** — real-time voice responses with streaming TTS
- 🎙 **Listens to you** — local speech-to-text with wake word activation, no cloud required
- 🔊 **Sound feedback** — distinct sounds for every state: activation, processing, task complete, warnings
- 🛡 **Asks before doing anything risky** — built-in safety system with permission prompts

---

## ✨ Key Features

### 🔮 The Orb
A glowing AI indicator that shows you exactly what Atlas is doing — idle, thinking, acting, or waiting for your input. Always visible, never in the way.

### 🏝 Islands
Context-aware floating panels that appear when relevant:
- **Action Island** — shows the current task and progress
- **Response Island** — streams Atlas's thoughts and replies word by word
- **Permission Island** — asks for confirmation before risky operations
- **Microtask Island** — your task queue with real-time step progress (queue new tasks while the agent is busy)
- **Search Island** — web search results and local file search results
- **Listening Island** — live transcript display during voice input
- **Warning Island** — dismissable warnings for errors and quota issues

### 🎯 Agent Cursor
When Atlas controls your desktop, you can see its cursor moving on screen — clicking, typing, and scrolling — so you always know what's happening.

### 🖥 Computer Use
With compatible Gemini 3.x models, Atlas uses the native **[Computer Use API](https://ai.google.dev/gemini-api/docs/computer-use)** for precise screen control — clicking, typing, scrolling, navigating, and searching — all without opening extra apps. Multi-monitor setups are supported.

### 🧩 Smart Task Planning
Before executing complex commands, Atlas breaks them into high-level steps (2–5) and displays them in the Task Queue. You see planned steps before execution begins and watch progress as each step completes.

### 🎭 Personas
Create multiple AI agents with unique personalities, knowledge, and voices. Each persona has its own memory and prompt settings — switch between them from the tray menu.

### 🧠 Memory
Atlas remembers your preferences and context across sessions. It learns facts about you from conversations and uses them to give better responses over time. Browse conversation history and view, edit, or delete learned facts in Settings.

### 🎙 Voice Input
Local offline speech-to-text via Vosk — just say the wake word (the active persona's name) and Atlas starts listening. No cloud API required.

Enable it in a minute:
- Open **Settings** → **Voice**
- Turn on **Enable STT**
- Turn on **Enable Wake Word** (optional, but recommended)
- Set **Wake Word** (default: `hey atlas`)
- Choose **Language**
- Click **Download** to install the Vosk STT model
- Say the wake word, then speak your command

Implementation reference:
- Frontend wake-word + transcript flow: `src/composables/useSTT.ts`
- Backend STT model/service layer: `electron/main/services/stt/STTService.ts`
- Default STT config (`enabled`, `wakeWordEnabled`, `customWakeWord`): `electron/main/utils/config/defaults.ts`

### ✍️ Editable Prompts
Full control over the AI's behavior — modify system, action, and safety prompts directly from the Settings UI. Reset to defaults anytime.

### ⚙️ Customizable Layout
Choose where Atlas appears on screen (left, right, or center) and configure your preferred activation hotkey — all from Settings.

### 🔧 Debug Logging
Enable per-request session logs to trace the full pipeline: intent classification → LLM calls → actions → response streaming — with precise timing for every stage.

---

## 🚀 Getting Started

### Option 1: Local Setup with Ollama (Recommended)

**Why Ollama?** Complete privacy, no subscription fees, runs entirely on your machine.

**Prerequisites:**
- [Ollama](https://ollama.ai) — Download and install
- [Node.js](https://nodejs.org/) ≥ 20
- [Yarn](https://yarnpkg.com/) ≥ 1.22

**Setup Steps:**

1. **Start Ollama with a local model:**
   ```bash
   ollama run mistral
   # or try: llama2, neural-chat, orca-mini
   ```

2. **Clone and build the agent:**
   ```bash
   git clone https://github.com/KISHOR-glitch/Ai-Desktop-Agent.git
   cd Ai-Desktop-Agent
   yarn install
   yarn dev
   ```

3. **Configure the agent:**
   - Open **Settings** → **Intelligence** tab
   - **LLM Provider:** Select `Ollama`
   - **API Endpoint:** `http://localhost:11434` (default)
   - **Model Name:** `mistral` (or your chosen model)
   - Click **Save**

4. **Enable voice (optional):**
   - **Settings** → **Voice** → Enable STT
   - Download Vosk model (English by default)
   - Set wake word: `hey agent`

5. **Start using:**
   - Press `Ctrl+Space`
   - Speak or type your command
   - Watch as it automates your screen 🎉

### Option 2: Cloud Setup (Gemini / OpenAI)

If you prefer cloud-based LLMs:

1. Get API key from [Google AI Studio](https://aistudio.google.com/apikey) or OpenAI
2. Run the agent: `yarn dev`
3. **Settings** → **Intelligence** → Paste API key
4. Select your model and start using

### Development

For contributors and developers:

```bash
git clone https://github.com/KISHOR-glitch/Ai-Desktop-Agent.git
cd Ai-Desktop-Agent
yarn install
yarn dev          # Start dev server
yarn build        # Build for production
yarn lint:fix     # Fix code style issues
```

> **Tech Stack:** Electron + React + TypeScript + Vite + Ollama + Vosk

---

## 🗺 Roadmap

| Status | Feature |
|:------:|---------|
| ✅ | Transparent glassmorphism overlay with Orb + Island UI |
| ✅ | Local LLM integration via Ollama (privacy-first) |
| ✅ | Multi-provider LLM support (Gemini + OpenAI + Ollama) |
| ✅ | Screen vision + desktop automation |
| ✅ | Smart task planning with step-by-step progress |
| ✅ | Agent cursor animations (click, type, scroll overlays) |
| ✅ | Streaming TTS (ElevenLabs + Alice) |
| ✅ | Persona system with isolated memory & custom voices |
| ✅ | Web search + local file search |
| ✅ | Settings UI with prompt editor + debug logging |
| ✅ | Intent classification (direct / action / chat) |
| ✅ | Voice input (wake word + local STT via Vosk) |
| 🔜 | Ollama model auto-download & management UI |
| 🔜 | Privacy audit log for all operations |
| 🔜 | Action whitelist/blacklist & safety constraints |
| 🔜 | Auto-update system |
| 🔜 | macOS & Linux support |

---

## 📚 Project Background

This is an **educational implementation** of the original [ATLAS](https://github.com/dortanes/atlas) project by [dortanes](https://github.com/dortanes), enhanced with:

- ✅ **Local LLM Integration** via Ollama for privacy-first operation
- ✅ **Zero Cloud Dependency** — Keep your data on your machine
- ✅ **Extended Test Coverage** and performance optimizations  
- ✅ **Academic Modifications** aligned with educational standards
- ✅ **Enhanced Documentation** for learning and reference

**Original License:** Apache License 2.0 — see [LICENSE](LICENSE) for full details.

---

## 🌟 Use Cases

- 🔍 **Research & Learning:** Understand how AI desktop automation works
- 🔒 **Privacy-Conscious Users:** Run AI without cloud dependencies  
- 🎓 **Students & Developers:** Fork and customize for your own projects
- ⚡ **Local AI Enthusiasts:** Leverage Ollama for offline-first automation
- 🤖 **AI Experimentation:** Test different local models and architectures

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
