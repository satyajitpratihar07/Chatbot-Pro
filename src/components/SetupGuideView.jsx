import React, { useState } from 'react';

const SetupGuideView = () => {
  const [copiedText, setCopiedText] = useState(null);
  const [simStep, setSimStep] = useState('idle'); // 'idle', 'client_req', 'proxy_auth', 'groq_proc', 'proxy_resp', 'completed'

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const startSimulation = () => {
    if (simStep !== 'idle') return;
    
    setSimStep('client_req');
    setTimeout(() => {
      setSimStep('proxy_auth');
      setTimeout(() => {
        setSimStep('groq_proc');
        setTimeout(() => {
          setSimStep('proxy_resp');
          setTimeout(() => {
            setSimStep('completed');
            setTimeout(() => {
              setSimStep('idle');
            }, 3000);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const setupSteps = [
    {
      num: '1',
      title: 'Hacker-Proof Env Config',
      desc: 'Declare your credentials inside .env using GROQ_API_KEY. Omitting VITE_ ensures Vite excludes the key from client bundles, keeping it safely stored in the Node environment.',
      code: 'GROQ_API_KEY=gsk_your_groq_api_key_here'
    },
    {
      num: '2',
      title: 'Dev Proxy Configuration',
      desc: 'Vite config loads the environment keys dynamically and maps the relative route /api/groq to targets on the Groq API. Headers are appended strictly on the server-side.',
      code: `server: {
  proxy: {
    '/api/groq': {
      target: 'https://api.groq.com/openai/v1',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\\/api\\/groq/, ''),
      headers: { 'Authorization': \`Bearer \${env.GROQ_API_KEY}\` }
    }
  }
}`
    },
    {
      num: '3',
      title: 'Client Endpoint Mapping',
      desc: 'In ChatView, replace absolute Groq URLs with local relative calls to /api/groq. Strip Authorization headers from browser code entirely, neutralizing network sniffing.',
      code: `const fetchUrl = activeApiKey === 'proxy_active' 
  ? '/api/groq/chat/completions' 
  : 'https://api.groq.com/openai/v1/chat/completions';`
    },
    {
      num: '4',
      title: 'Server Hot-Reload & Deploy',
      desc: 'Launch the server. When deploying to production (e.g. Vercel, Netlify, Docker), define GROQ_API_KEY in the host dashboards config environment vars settings.',
      code: 'npm run dev # Launches local secure environment'
    }
  ];

  const setupMdContent = `# Aura AI Installation & Security Setup Guide

This document outlines structural procedures to configure, deploy, and verify the Aura AI platform with a secure, hacker-proof API credentials proxy.

---

## 📋 Architectural Specifications

Standard React builds execute entirely inside client browsers, meaning any API keys embedded via import.meta.env are visible in raw client source files or browser network inspectors.

Aura AI defeats key-sniffing by routing calls through local Node.js proxies:
* The Key is written to a private GROQ_API_KEY (no VITE_ prefix). Vite ignores it during compilation.
* The Local Proxy intercepts relative browser fetches at /api/groq, loads the key on the server-side, appends authorization headers, and forwards the packet to Groq.

---

## 🛠️ Step-by-Step Installation

### Step 1: Environment Configuration
Create a .env file in the root workspace folder:

GROQ_API_KEY=gsk_your_groq_api_key_here

---

### Step 2: Install Packages
Install node packages and Tailwind CSS v4 compiler extensions:
npm install

### Step 3: Launch Dev Environment
Start the development server. This launches the local proxy gateway on port 5173:
npm run dev

### Step 4: Compile Client Distribution
Generate optimized static production builds inside the dist/ folder:
npm run build

---

## 🛡️ Production Deployment Hardening

When deploying Aura AI to production servers:
1. Define Keys on Host: Add the GROQ_API_KEY variable inside your deployment host's settings panel.
2. Serverless Function Rewrite: Ensure your host configuration maps /api/groq to a serverless function that attaches the Authorization: Bearer <key> header on the server side.
3. Verify Bundle Files: Verify compiled assets:
   grep -rn "gsk_" dist/
`;

  const downloadSetupMd = () => {
    const blob = new Blob([setupMdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'setup.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1000px] w-full space-y-xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 219, 233, 0.2); }
          50% { box-shadow: 0 0 25px rgba(0, 219, 233, 0.5); }
        }
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); }
          50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); }
        }
        @keyframes pulsePurple {
          0%, 100% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.2); }
          50% { box-shadow: 0 0 25px rgba(168, 85, 247, 0.5); }
        }
        @keyframes flowDash {
          to { stroke-dashoffset: -40; }
        }
        .flow-dash-active {
          stroke-dasharray: 8, 4;
          animation: flowDash 0.6s linear infinite;
        }
        .glow-card-cyan { animation: pulseGlow 2s infinite; }
        .glow-card-emerald { animation: pulseGreen 2s infinite; }
        .glow-card-purple { animation: pulsePurple 2s infinite; }
      `}</style>

      {/* Header */}
      <header className="text-left flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[32px] font-semibold mb-2">Setup Guide</h2>
          <p className="text-on-surface-variant text-[16px]">
            Configure environment variables, review network proxies, and harden security.
          </p>
        </div>
        
        <div className="flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={downloadSetupMd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-bold border border-white/10 hover:border-primary-fixed-dim/30 bg-surface-container/20 text-on-surface hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download setup.md</span>
          </button>

          <button
            onClick={startSimulation}
            disabled={simStep !== 'idle'}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-bold shadow-lg transition-all cursor-pointer ${
              simStep === 'idle'
                ? 'bg-primary-fixed-dim text-on-primary hover:scale-[1.03] active:scale-[0.97]'
                : 'bg-white/10 text-on-surface-variant/40 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] animate-spin">
              {simStep !== 'idle' ? 'autorenew' : 'bolt'}
            </span>
            <span>{simStep === 'idle' ? 'Simulate Data Pipeline' : 'Simulation Active...'}</span>
          </button>
        </div>
      </header>

      {/* Interactive Simulator Flowchart */}
      <section className="glass-panel p-6 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="text-left w-full sm:max-w-[75%]">
            <h3 className="text-[18px] font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed-dim">route</span>
              <span>Interactive Pipeline Simulator</span>
            </h3>
            <p className="text-[12px] text-on-surface-variant mt-1 leading-relaxed">
              Click the button above to fire a request packet and witness the real-time proxy header authorization mapping.
            </p>
          </div>
          
          {/* Status Badge */}
          <div className="flex-shrink-0">
            <span className={`text-[10px] px-3 py-1 rounded-full border uppercase tracking-wider font-mono font-bold transition-all duration-300 ${
              simStep === 'idle' ? 'bg-white/5 border-white/10 text-on-surface-variant' :
              simStep === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              'bg-primary-fixed-dim/10 border-primary-fixed-dim/20 text-primary-fixed-dim animate-pulse'
            }`}>
              Status: {simStep.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="p-6 bg-surface-container/30 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          {/* Node 1: Browser */}
          <div className={`w-full md:w-64 glass-panel p-5 rounded-xl text-center space-y-3 border transition-all duration-300 z-10 ${
            simStep === 'client_req' || simStep === 'completed'
              ? 'border-emerald-500/40 bg-emerald-500/5 glow-card-emerald'
              : 'border-white/5 bg-surface-container-low/70'
          }`}>
            <span className={`material-symbols-outlined text-[32px] transition-transform duration-300 ${
              simStep === 'client_req' ? 'scale-110 text-emerald-400 rotate-12' : 'text-on-surface-variant/70'
            }`}>
              devices
            </span>
            <div>
              <h4 className="font-bold text-[14px] text-on-surface">1. User Browser</h4>
              <span className="text-[10px] text-on-surface-variant/60 block font-mono">Port: 5173</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {simStep === 'client_req' ? '🚀 Sending prompt payload to local proxy /api/groq...' :
               simStep === 'completed' ? '🎉 Completion payload received! Render message bubble.' :
               'Awaiting user prompt input. Key variables are NOT loaded here.'}
            </p>
          </div>

          {/* Connector 1 */}
          <div className="w-16 h-16 md:w-28 md:h-10 flex items-center justify-center z-0">
            <svg className="w-full h-full rotate-90 md:rotate-0 overflow-visible" viewBox="0 0 100 20">
              <path d="M 0 10 L 100 10" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path 
                d="M 0 10 L 100 10" 
                stroke={simStep === 'proxy_resp' ? '#10b981' : '#00dbe9'} 
                strokeWidth="4" 
                strokeLinecap="round"
                fill="none" 
                className={simStep === 'client_req' || simStep === 'proxy_resp' ? 'flow-dash-active' : ''} 
                opacity={simStep === 'client_req' || simStep === 'proxy_resp' ? 1 : 0}
              />
            </svg>
          </div>

          {/* Node 2: Proxy Server */}
          <div className={`w-full md:w-64 glass-panel p-5 rounded-xl text-center space-y-3 border transition-all duration-300 z-10 ${
            simStep === 'proxy_auth' || simStep === 'proxy_resp'
              ? 'border-primary/50 bg-primary/5 glow-card-cyan'
              : 'border-white/5 bg-surface-container-low/70'
          }`}>
            <span className={`material-symbols-outlined text-[32px] transition-transform duration-300 ${
              simStep === 'proxy_auth' ? 'scale-110 text-primary rotate-45' : 'text-on-surface-variant/70'
            }`}>
              dns
            </span>
            <div>
              <h4 className="font-bold text-[14px] text-on-surface">2. Node.js Dev Proxy</h4>
              <span className="text-[10px] text-on-surface-variant/60 block font-mono">vite.config.js</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {simStep === 'proxy_auth' ? '🔐 Injecting GROQ_API_KEY Bearer header to target...' :
               simStep === 'proxy_resp' ? '✨ Forwarding LLM answer stream back to browser client...' :
               'Vite server intercepts /api/groq. Authorization keys remain secret.'}
            </p>
          </div>

          {/* Connector 2 */}
          <div className="w-16 h-16 md:w-28 md:h-10 flex items-center justify-center z-0">
            <svg className="w-full h-full rotate-90 md:rotate-0 overflow-visible" viewBox="0 0 100 20">
              <path d="M 0 10 L 100 10" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path 
                d="M 0 10 L 100 10" 
                stroke={simStep === 'groq_proc' ? '#a855f7' : '#00dbe9'} 
                strokeWidth="4" 
                strokeLinecap="round"
                fill="none" 
                className={simStep === 'proxy_auth' || simStep === 'groq_proc' ? 'flow-dash-active' : ''} 
                opacity={simStep === 'proxy_auth' || simStep === 'groq_proc' ? 1 : 0}
              />
            </svg>
          </div>

          {/* Node 3: Groq LLM */}
          <div className={`w-full md:w-64 glass-panel p-5 rounded-xl text-center space-y-3 border transition-all duration-300 z-10 ${
            simStep === 'groq_proc'
              ? 'border-purple-500/50 bg-purple-500/5 glow-card-purple'
              : 'border-white/5 bg-surface-container-low/70'
          }`}>
            <span className={`material-symbols-outlined text-[32px] transition-transform duration-300 ${
              simStep === 'groq_proc' ? 'scale-110 text-purple-400 rotate-90' : 'text-on-surface-variant/70'
            }`}>
              memory
            </span>
            <div>
              <h4 className="font-bold text-[14px] text-on-surface">3. Groq API Node</h4>
              <span className="text-[10px] text-on-surface-variant/60 block font-mono">Llama-3.3-70b</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {simStep === 'groq_proc' ? '⚡ Processing tokens inside Groq LPU core. Compiling completion...' :
               'Awaiting auth payload. Processes user prompts with system parameters.'}
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Details Installation */}
      <section className="space-y-4">
        <h3 className="text-[18px] font-semibold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed-dim">build_circle</span>
          <span>Advanced Setup Configurations</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {setupSteps.map((step) => (
            <div key={step.num} className="glass-panel p-6 rounded-xl flex flex-col justify-between gap-4 bg-surface-container/20">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary-fixed-dim/20 border border-primary-fixed-dim text-primary flex items-center justify-center font-bold text-[12.5px]">
                    {step.num}
                  </span>
                  <h4 className="font-semibold text-[15px] text-on-surface">{step.title}</h4>
                </div>
                <p className="text-[12px] text-on-surface-variant leading-relaxed min-h-[50px]">
                  {step.desc}
                </p>
              </div>
              
              <div className="relative bg-surface-container-low/80 rounded-lg p-4 pr-12 border border-white/5 font-mono text-[11px] text-on-surface-variant select-text">
                <pre className="overflow-x-auto whitespace-pre-wrap break-all pr-2 max-h-[160px] leading-relaxed text-[#cbf4f7]">
                  {step.code}
                </pre>
                <button
                  type="button"
                  onClick={() => copyToClipboard(step.code, step.num)}
                  className="absolute right-3 top-4 p-2 rounded bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer select-none"
                  title="Copy Command"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedText === step.num ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SetupGuideView;
