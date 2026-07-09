# 🌌 Aura AI — Premium Intelligent Virtual Assistant

<div align="center">

[![React](https://img.shields.github.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.github.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62B)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.github.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq API](https://img.shields.github.io/badge/Groq_API-f35b25?style=for-the-badge&logo=lightning&logoColor=white)](https://groq.com/)
[![JavaScript](https://img.shields.github.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**A high-performance virtual assistant client featuring server-side mask proxies, customizable sliders, dynamic styles customizers, and interactive pipeline sandboxes.**

</div>

---

## 🎯 Key Capabilities

* **🔒 Server-Side Key Masking**: Completely bypasses client-side authorization headers by running local Node.js rewrites, shielding private keys from browser devtools.
* **⚡ Groq LPU Engine Integration**: Queries the `llama-3.3-70b-versatile` completion node with stream processing support.
* **🧠 Real-Time Personality Tuning**: Shift prompt instructions instantly using sliders:
  * **Precision Mode**: Direct, factual markdown lists (no conversational filler).
  * **Balanced Mode**: Professional and conversational assistance.
  * **Creative Burst**: Elaborate concepts, vocabulary, and metaphors.
* **🔬 Analytical Depth Parsing**: Isolates and filters raw `<thinking>` XML logs from token responses, rendering them inside custom consoles.
* **🎨 Style Customization Dashboard**: Toggle light, dark, and high-contrast modes, or choose colored accent rings (Cyan, Purple, Gold, Coral) to rebind HSL root colors in real-time.
* **🔄 Interactive Pipeline Simulator**: Play an interactive vector simulation that visualizes authorized connection handshakes and data packets moving between client, proxy, and Groq.
* **📂 Search Query Logging**: Automatically caches search parameters inside persistent `localStorage` queues.

---

## 🏗️ Data Flow Architecture

```
[User Browser Client]
      │
      │ (Unauthenticated Fetch: /api/groq/chat/completions)
      ▼
[Vite Local Proxy Gateway (Node.js)]
      │
      │ (Intercepts request, loads GROQ_API_KEY from .env, injects Auth Header)
      ▼
[Groq Cloud API Endpoint (Authorized HTTPS POST)]
```

---

## 🛠️ Installation & Setup

### 1. Set Up Environment Keys
Create a `.env` file in the root project folder:
```env
GROQ_API_KEY=gsk_your_groq_api_token_here
```

> [!CAUTION]
> Never name the key `VITE_GROQ_API_KEY`. If you do, Vite's compiler automatically bundles the key into client browser scripts, exposing it to visitors.

### 2. Install Node Packages
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

> [!IMPORTANT]
> If you make changes to `.env` or `vite.config.js`, you must **restart the dev server** in your terminal for the Node server to register the new proxy settings.

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🔄 Proxy Server Configurations

The relative route redirection is declared inside `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api/groq': {
      target: 'https://api.groq.com/openai/v1',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/groq/, ''),
      headers: {
        'Authorization': `Bearer ${env.GROQ_API_KEY}`
      }
    }
  }
}
```

---

## 👥 Authorship & Credits

* **Developer**: **Satyajit Pratihar**
