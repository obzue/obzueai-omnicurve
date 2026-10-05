# OBZUEAI - Omnicurve Studio Pro

![OBZUEAI Omnicurve Studio Pro](https://raw.githubusercontent.com/obzue/obzueai-omnicurve/main/docs/media/logo.png)

An interactive, browser-based ecosystem integrating autonomous AI agent assistance, 3D environment exploration, voice-activated "vibe coding," and a multi-chain cryptocurrency payment gateway.

---

## Core Features

- **Omni-Agent Vibe Coding Engine:** Built-in microphone integration across chat and profile prompt bars allowing users to interact with persistent AI agents to construct code, 3D scenes, and digital assets.
- **Multi-Chain Crypto Gateway:** Built-in digital wallet checkout supporting XRP, BTC, SHIB, USDT, LTC, SOL, and ETH to acquire ecosystem community tokens.
- **3D Open Lobby & City:** Real-time WebGL workspace for exploring virtual storefronts, visiting creative studios, and collaborating with community members.
- **Persistent AI Agent Profiles:** Profiles linked with background AI agents capable of running virtual browser tasks, executing code compilers, and automating multi-turn project workflows.

---

## Project Structure

```text
OBZUEAI - Omnicurve Studio Pro/
├── .claude/
│   └── skills/
│       ├── crypto-wallet-gateway/
│       │   └── SKILL.md
│       ├── pro-tools-engine/
│       │   └── SKILL.md
│       └── obsimlabs-web-graphic-master/
│           └── SKILL.md
├── docs/
│   ├── COMMUNITY_GUIDELINES.md
│   ├── PRIVACY_POLICY.md
│   └── media/
│       └── PILOT_VIDEO_SPEC.md
├── scripts/
│   ├── push-to-github.js
│   └── Launch_OBZUEAI.bat
├── src/
│   ├── components/
│   │   ├── ChatPrompt.jsx         # Voice vibe coding mic bar
│   │   ├── CryptoPaymentModal.jsx # Multi-chain crypto checkout
│   │   └── UserProfile.jsx        # Profile prompt & AI agent routing
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
