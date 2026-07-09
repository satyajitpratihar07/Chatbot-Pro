# Aura AI Installation & Security Setup Guide

This document outlines structural procedures to configure, deploy, and verify the Aura AI platform with a secure, hacker-proof API credentials proxy.

---

## 📋 Architectural Specifications

Standard React builds execute entirely inside client browsers, meaning any API keys embedded via `import.meta.env` are visible in raw client source files or browser network inspectors.

Aura AI defeats key-sniffing by routing calls through local Node.js proxies:
* **The Key** is written to a private `GROQ_API_KEY` (no `VITE_` prefix). Vite ignores it during compilation.
* **The Local Proxy** intercepts relative browser fetches at `/api/groq`, loads the key on the server-side, appends authorization headers, and forwards the packet to Groq.

---

## 🛠️ Step-by-Step Installation

### Step 1: Environment Configuration
Create a `.env` file in the root workspace folder:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

> [!CAUTION]
> Never prefix your private keys with `VITE_` (e.g. `VITE_GROQ_API_KEY`). If you do, Vite's build compiler will bake the key directly into your shipped assets, exposing it to visitors.

### Step 2: Install Packages
Install node packages and Tailwind CSS v4 compiler extensions:

```bash
npm install
```

### Step 3: Launch Dev Environment
Start the development server. This launches the local proxy gateway on port `5173`:

```bash
npm run dev
```

> [!IMPORTANT]
> If you modified `.env` or `vite.config.js` while the server was running, you **must restart the server** (`Ctrl + C` then `npm run dev`) for Node to register the proxy routes.

### Step 4: Compile Client Distribution
Generate optimized static production builds inside the `dist/` folder:

```bash
npm run build
```

---

## 🛡️ Production Deployment Hardening

When deploying Aura AI to production servers (e.g. Vercel, Netlify, Render, Docker):
1. **Define Keys on Host:** Add the `GROQ_API_KEY` variable inside your deployment host's settings panel.
2. **Serverless Function Rewrite:** Ensure your host configuration maps `/api/groq` to a serverless function that attaches the `Authorization: Bearer <key>` header on the server side before fetching Groq.
3. **Verify Bundle Files:** Verify compiled assets using search tools to confirm that the key signature (`gsk_...`) is absent from public builds:
   ```bash
   grep -rn "gsk_" dist/
   ```
