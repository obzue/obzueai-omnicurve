# ObzueAI Omnicurve Studio Pro

![ObzueAI Omnicurve mark](https://raw.githubusercontent.com/obzue/obzueai-omnicurve/main/docs/media/logo.svg)

Browser studio for a prompt terminal, a local lobby sketch, a display name, and a demo token counter.

This repository does not run a shared 3D city, a background agent, a compiler, or a crypto checkout.

## What works in this tab

- Text prompt echo, plus Web Speech input where the browser allows it.
- Display name and demo token count stored in `localStorage`.
- Canvas lobby preview drawn in the page.
- Demo counter. It does not show a deposit address and does not verify a transaction.

## What is not in this repo

- Multiplayer lobby, marketplace, or live occupancy.
- Persistent agents, virtual browsers, or unattended compilers.
- On-chain payment, wallet custody, or token issuance.
- The skill folders named in the earlier README. Those files were never committed.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

GitHub Pages base path is `/obzueai-omnicurve/`. The deploy workflow builds `dist` from the repository root.

## Layout

```text
src/
  App.jsx
  main.jsx
  index.css
  components/
    ChatPrompt.jsx
    CryptoPaymentModal.jsx
    LobbyPreview.jsx
    UserProfile.jsx
docs/
scripts/push-to-github.js   # exits. It does not force-push.
```

## Fixes in 1.1.0

The first export stored sources as flat double-extension names, so Vite and Pages could not see them. The Pages workflow also entered a directory that did not exist. The old checkout copied placeholder addresses and treated a timeout as payment verification. The old push script force-pushed `main`.
