# 📘 Aura AI — Technical System Architecture Manual

<div align="center">

[![Documentation](https://img.shields.github.io/badge/Documentation-Architecture-blue?style=for-the-badge&logo=gitbook&logoColor=white)](#)
[![Security Gateway](https://img.shields.github.io/badge/Security-Hacker--Proof-emerald?style=for-the-badge&logo=dependabot&logoColor=white)](#)
[![Design Tokens](https://img.shields.github.io/badge/Design_Tokens-Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

**Comprehensive engineering blueprints detailing component hierarchies, server-side proxies, regular expression parsers, and the HSL variable styling system.**

</div>

---

## 🏗️ Technical Architecture

Aura AI operates as an integrated single-page application built on a client-server architecture model.

```
             ┌──────────────────────────────────────────┐
             │            Browser (Client)              │
             │  • App.jsx (Theme & Variable Injector)   │
             │  • ChatView.jsx (Regex XML tag parser)   │
             │  • HistoryView.jsx (localStorage cache)  │
             └────────────────────┬─────────────────────┘
                                  │
                   (Fetch request to /api/groq)
                                  ▼
             ┌──────────────────────────────────────────┐
             │       Vite Local Dev Server (Node)       │
             │  • Proxy middleware interceptor          │
             │  • Injects env GROQ_API_KEY as header    │
             └────────────────────┬─────────────────────┘
                                  │
                      (Authorized HTTPS POST)
                                  ▼
             ┌──────────────────────────────────────────┐
             │             Groq API Core                │
             │  • Llama-3.3-70b-versatile completion    │
             └──────────────────────────────────────────┘
```

---

## 🔒 Server-Side API Proxying

Standard frontend setups bundle API credentials into browser scripts, leaving them open to scraping or sniffing. Aura AI eliminates this vector by implementing a server-side rewrite proxy configured in `vite.config.js`:

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

### Protocol Sequence:
1. **Client Action**: The browser makes a fetch request to the relative URL `/api/groq/chat/completions`. No API keys or credentials are included in the request headers from the browser.
2. **Server Middleware**: The local Vite Node dev server intercepts the `/api/groq` route. It reads the secret `GROQ_API_KEY` from the server's private `.env` file, attaches the authorization header, and forwards the request to Groq.
3. **API Response**: Groq processes the authorized request, sends back the completion stream to the proxy, and the proxy redirects it to the client.

---

## 🧠 Analytical Depth (Reasoning Parser)

When the **Analytical Depth** toggle is activated, the prompt builder instructs the LLM to wrap its logical step-by-step thinking process inside `<thinking>` XML blocks.

### Regex Extraction Script:
Inside [ChatView.jsx](file:///c:/Users/satya/OneDrive/Pictures/Chatbot/src/components/ChatView.jsx), the application uses regular expressions to extract and separate these nodes on the fly:

```javascript
// Extract the thinking segment enclosed in tags
const thinkingMatch = fullResponseText.match(/<thinking>([\s\S]*?)<\/thinking>/i);
let thinking = null;
let responseText = fullResponseText;

if (thinkingMatch) {
  thinking = thinkingMatch[1].trim();
  // Strip the thinking node from the final message text
  responseText = fullResponseText.replace(/<thinking>([\s\S]*?)<\/thinking>/i, '').trim();
}
```

> [!NOTE]
> * **Extracted Logs**: Stored inside the message state `thinking` property and rendered inside a collapsible warning console.
> * **Main Bubble**: Renders only the clean `responseText` markdown, keeping the main bubble layout clean.

---

## 🎨 HSL Style Customizer & Color Injector

The visual dashboard updates themes and colors instantly without requiring page reloads by modifying variables at the document root level:

### 1. Theme Selection overrides
Choosing theme classes rebinds background variables in `index.css`:
* **Deep Dark**: Injects the default `.dark` theme wrapper.
* **Aura Light**: Injects the light theme `.theme-light` class.
* **High Contrast**: Injects `.theme-high-contrast` for visual clarity.

### 2. Accent Color binding
Color selectors instantly re-map primary HSL styling variables across all UI cards:
```javascript
const selectedAccent = accentColors[settings.accentColor];
document.documentElement.style.setProperty('--accent-color', selectedAccent.color);
document.documentElement.style.setProperty('--accent-color-rgb', selectedAccent.rgb);
document.documentElement.style.setProperty('--accent-color-on', selectedAccent.on);
document.documentElement.style.setProperty('--accent-color-container', selectedAccent.container);
```

---

## 👥 Authorship & Credits

* **Developer**: **Satyajit Pratihar**
