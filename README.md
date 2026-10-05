# ObzueAI Omnicurve Studio Pro

![ObzueAI Omnicurve mark](https://raw.githubusercontent.com/obzue/obzueai-omnicurve/main/docs/media/logo.svg)

Browser studio for a prompt terminal, a local lobby sketch, a display name, and a demo token counter.

This repository does not run a shared 3D city, a background agent, a compiler, or a crypto checkout.

## Counter

The starter balance is 1,500. A 49.99 USD package would grant 5,000 tokens, at 0.009998 USD each. That grant is not applied. The old counter added 5,000 after a button press, which made a checked browser show 6,500 with no payment.

## Deposit and change

The charge panel shows a deposit-address row and a change-address row. Both are unconfigured. The Gemini share asked whether to accept crypto and described OmniCur bought with dollars. It did not include a wallet address. Placeholder addresses from the first export are not restored, because they were not payable addresses.

## What works in this tab

- Text prompt echo, plus Web Speech input where the browser allows it.
- Display name and demo token count stored in `localStorage`.
- Canvas lobby preview drawn in the page.
- Charge review. It does not credit tokens and does not accept funds.

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
