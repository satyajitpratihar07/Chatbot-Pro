import React, { useState, useEffect } from 'react';

const SystemOverviewAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 85);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStep = 
    progress < 25 ? 1 :
    progress < 50 ? 2 :
    progress < 75 ? 3 : 4;

  const stepsInfo = [
    { num: 1, text: "Step 1: Browser client fires dynamic route payload matching relative URL '/api/groq'." },
    { num: 2, text: "Step 2: Server Dev Proxy captures request, fetches GROQ_API_KEY from Node, and injects Authorized header." },
    { num: 3, text: "Step 3: Groq Llama 3.3 Versatile model processes the prompt parameters and compiles tokens." },
    { num: 4, text: "Step 4: Server redirects secure payload response back to browser layout client for bubble renders." }
  ];

  return (
    <div className="space-y-4">
      {/* Video Viewport */}
      <div className="relative h-[190px] rounded-xl border border-white/5 bg-surface-container-low/60 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
        {/* Animated Nodes Grid */}
        <div className="flex-1 flex justify-between items-center relative px-8 z-10">
          {/* SVG Connection line */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-10 overflow-visible" viewBox="0 0 300 20">
              <path d="M 10 10 L 290 10" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
              {/* Request packet */}
              {isPlaying && progress < 50 && (
                <circle 
                  r="6" 
                  fill="#00dbe9" 
                  style={{
                    transform: `translateX(${progress * 6}px)`,
                    filter: 'drop-shadow(0 0 8px #00dbe9)'
                  }}
                  cx="10"
                  cy="10"
                />
              )}
              {/* Response packet */}
              {isPlaying && progress >= 50 && (
                <circle 
                  r="6" 
                  fill="#10b981" 
                  style={{
                    transform: `translateX(${(100 - progress) * 6}px)`,
                    filter: 'drop-shadow(0 0 8px #10b981)'
                  }}
                  cx="10"
                  cy="10"
                />
              )}
            </svg>
          </div>

          {/* Node 1: Browser */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeStep === 1 || activeStep === 4 ? 'scale-110 text-cyan-400' : 'text-on-surface-variant/40'
          }`}>
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
              activeStep === 1 || activeStep === 4 ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_12px_rgba(0,219,233,0.3)]' : 'border-white/10 bg-white/5'
            }`}>
              <span className="material-symbols-outlined text-[20px]">devices</span>
            </div>
            <span className="text-[10px] font-bold">Client Browser</span>
          </div>

          {/* Node 2: Server Proxy */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeStep === 2 ? 'scale-110 text-primary-fixed-dim' : 'text-on-surface-variant/40'
          }`}>
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
              activeStep === 2 ? 'border-primary-fixed-dim bg-primary-fixed-dim/10 shadow-[0_0_12px_rgba(0,219,233,0.3)]' : 'border-white/10 bg-white/5'
            }`}>
              <span className="material-symbols-outlined text-[20px]">dns</span>
            </div>
            <span className="text-[10px] font-bold">Vite Proxy</span>
          </div>

          {/* Node 3: Groq API */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeStep === 3 ? 'scale-110 text-purple-400' : 'text-on-surface-variant/40'
          }`}>
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
              activeStep === 3 ? 'border-purple-400 bg-purple-400/10 shadow-[0_0_12px_rgba(168,85,247,0.3)]' : 'border-white/10 bg-white/5'
            }`}>
              <span className="material-symbols-outlined text-[20px]">memory</span>
            </div>
            <span className="text-[10px] font-bold">Groq LLM</span>
          </div>
        </div>

        {/* Sync Text ticker */}
        <div className="h-10 border-t border-white/5 pt-2.5 flex items-center justify-center">
          <p className="text-[11.5px] text-[#cbf4f7] font-semibold leading-relaxed max-w-[600px] w-full text-center animate-pulse">
            {stepsInfo[activeStep - 1].text}
          </p>
        </div>
      </div>

      {/* Video timeline controllers */}
      <div className="flex items-center justify-between px-2 text-on-surface-variant select-none">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <span className="text-[10px] font-mono tracking-wider">
            {isPlaying ? 'PLAYING LOOP' : 'VIDEO PAUSED'}
          </span>
        </div>

        {/* Video progress track */}
        <div className="flex-1 max-w-md mx-6 h-1.5 rounded-full bg-white/10 relative overflow-hidden">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-primary-fixed-dim rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] font-mono text-right w-12 text-[#cbf4f7]">
          {progress}%
        </span>
      </div>
    </div>
  );
};

const DocumentationView = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // XML Parser interactive simulator state
  const [parserState, setParserState] = useState('raw'); // 'raw', 'parsing', 'parsed'
  const rawResponse = `<thinking>
1. User queried: "What is React?"
2. Personality: Precision Mode active.
3. Plan: Output concise definition & key features.
</thinking>
React is a popular UI library. Key features:
- Component-Based
- Declarative Rendering
- Virtual DOM`;

  // Mini CSS Accent Simulator state
  const [previewAccent, setPreviewAccent] = useState('cyan');
  const accentColors = {
    cyan: '#00dbe9',
    purple: '#d0bcff',
    yellow: '#eac324',
    red: '#ffb4ab'
  };

  const runXmlParser = () => {
    if (parserState !== 'raw') return;
    setParserState('parsing');
    setTimeout(() => {
      setParserState('parsed');
    }, 1500);
  };

  const resetXmlParser = () => {
    setParserState('raw');
  };

  const slides = [
    {
      title: 'Aura AI — Architectural Overview',
      subtitle: 'Premium Intelligent Virtual Assistant',
      icon: 'auto_awesome',
      color: 'text-primary-fixed-dim',
      content: (
        <div className="space-y-4">
          <p className="text-[13.5px] text-on-surface-variant leading-relaxed">
            Aura AI is a modern React application utilizing a multi-layered design system. Instead of shipping simple views, it encapsulates settings managers, secure development gateways, FAQ libraries, and dynamic styling layers into a responsive sidebar frame.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-surface-container/60 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[12px] font-bold text-primary block">Modular View Layering</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                App routers swap views dynamically based on component hooks. Unused states (like dashboard charts) are pruned completely to optimize memory footprints.
              </p>
            </div>
            <div className="bg-surface-container/60 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[12px] font-bold text-primary block">Local Storage Sync</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                All client preferences (sliders, reasoning active states, theme styles) are read and written to `localStorage` using JSON parsers, maintaining custom settings on reload.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Hacker-Proof API Security Proxy',
      subtitle: 'Masking API Keys from Network Inspectors',
      icon: 'shield',
      color: 'text-emerald-400',
      content: (
        <div className="space-y-4">
          <p className="text-[13.5px] text-on-surface-variant leading-relaxed">
            Web browsers are sandbox environments where client source codes are public. To block keys from appearing in browser debuggers and JS bundle scripts:
          </p>
          <div className="bg-surface-container/60 p-4 rounded-xl border border-white/5 space-y-3">
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono text-[10px] flex items-center justify-center flex-shrink-0">A</span>
              <p className="text-[11.5px] text-on-surface-variant leading-relaxed">
                <strong>Env Isolation:</strong> Moving the key to `GROQ_API_KEY` (removing VITE_) prevents the Vite bundler from baking it intocompiled JS files.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono text-[10px] flex items-center justify-center flex-shrink-0">B</span>
              <p className="text-[11.5px] text-on-surface-variant leading-relaxed">
                <strong>Vite Server Proxy:</strong> A rewrite rule intercepts relative `/api/groq` fetches, loads key variables securely in Node, appends authorization headers, and routes requests to the API.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Groq Live Model Integration',
      subtitle: 'Real-time Completion Handshakes',
      icon: 'memory',
      color: 'text-purple-400',
      content: (
        <div className="space-y-3">
          <p className="text-[13.5px] text-on-surface-variant leading-relaxed">
            API prompts request completions from Groq's high-speed <code className="bg-white/5 px-1.5 py-0.5 rounded text-purple-400">llama-3.3-70b-versatile</code> model.
          </p>
          <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 font-mono text-[10.5px] text-on-surface-variant space-y-2 leading-relaxed">
            <div className="text-emerald-400">// API Request Parameters:</div>
            <div>{`const response = await fetch('/api/groq/chat/completions', {`}</div>
            <div className="pl-4">{`method: 'POST',`}</div>
            <div className="pl-4">{`headers: { 'Content-Type': 'application/json' }, // No tokens sent here!`}</div>
            <div className="pl-4">{`body: JSON.stringify({`}</div>
            <div className="pl-8">{`model: 'llama-3.3-70b-versatile',`}</div>
            <div className="pl-8">{`temperature: settings.personality / 100`}</div>
            <div className="pl-4">{`})`}</div>
            <div>{`});`}</div>
          </div>
        </div>
      )
    },
    {
      title: 'AI Personality Prompt Mapping',
      subtitle: 'Dynamic System Instructions Adjustments',
      icon: 'settings_accessibility',
      color: 'text-yellow-400',
      content: (
        <div className="space-y-4">
          <p className="text-[13.5px] text-on-surface-variant leading-relaxed">
            The platform alters system instructions depending on the slider mode chosen in Settings, modifying prompt rules dynamically:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-surface-container/60 rounded-lg border border-white/5 text-left space-y-1">
              <span className="text-[11px] font-bold text-cyan-400">Precision Mode</span>
              <p className="text-[10px] text-on-surface-variant/80 leading-relaxed">Respond in concise, factual, direct markdown lists. Avoid small talk, greetings, or conversational filler.</p>
            </div>
            <div className="p-3 bg-surface-container/60 rounded-lg border border-white/5 text-left space-y-1">
              <span className="text-[11px] font-bold text-yellow-400">Balanced Mode</span>
              <p className="text-[10px] text-on-surface-variant/80 leading-relaxed">Respond in a friendly, helpful, standard professional, and well-rounded tone.</p>
            </div>
            <div className="p-3 bg-surface-container/60 rounded-lg border border-white/5 text-left space-y-1">
              <span className="text-[11px] font-bold text-purple-400">Creative Burst</span>
              <p className="text-[10px] text-on-surface-variant/80 leading-relaxed">Use vivid metaphors, rich vocabulary, conceptual analogies, and open-ended detailed concepts.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Analytical Depth Parser Simulator',
      subtitle: 'XML Parsing Demonstration (Interactive)',
      icon: 'psychology',
      color: 'text-rose-400',
      content: (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-left w-full sm:max-w-[75%]">
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Aura AI extracts raw <code className="text-rose-400">&lt;thinking&gt;</code> blocks inside API streams. Click below to simulate the extraction.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <button
                onClick={parserState === 'parsed' ? resetXmlParser : runXmlParser}
                disabled={parserState === 'parsing'}
                className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 font-semibold text-[11px] cursor-pointer transition-all select-none"
              >
                {parserState === 'raw' ? 'Run Parser ⚡' :
                 parserState === 'parsing' ? 'Parsing...' : 'Reset'}
              </button>
            </div>
          </div>

          {/* Interactive Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[190px] text-[11px]">
            {/* Input / Left */}
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-white/5 font-mono flex flex-col justify-between">
              <div>
                <span className="text-on-surface-variant block border-b border-white/5 pb-1 mb-2 font-sans font-bold">1. Raw API completion payload</span>
                <pre className="text-on-surface-variant/70 overflow-y-auto max-h-[120px] whitespace-pre-wrap leading-relaxed">
                  {rawResponse}
                </pre>
              </div>
            </div>

            {/* Output / Right */}
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-white/5 font-mono flex flex-col justify-between relative overflow-hidden">
              {parserState === 'raw' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-sans font-semibold text-on-surface-variant/60">
                  Awaiting Parser Trigger
                </div>
              )}
              {parserState === 'parsing' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-sans font-semibold text-rose-400 animate-pulse">
                  Splitting XML nodes...
                </div>
              )}
              
              <div className="space-y-2 overflow-y-auto max-h-[160px] pr-1">
                <div>
                  <span className="text-emerald-400 font-sans font-bold block mb-1">⚡ Extracted Thinking (Saved in State):</span>
                  <pre className="p-2 bg-emerald-950/30 rounded border border-emerald-500/10 text-emerald-400 leading-normal">
                    {`1. User queried: "What is React?"\n2. Plan: Output concise definition & key features.`}
                  </pre>
                </div>
                <div>
                  <span className="text-cyan-400 font-sans font-bold block mb-1">💬 Clean Message Bubble (Shown in UI):</span>
                  <pre className="p-2 bg-cyan-950/30 rounded border border-cyan-500/10 text-cyan-300 leading-normal">
                    {`React is a popular UI library. Key features:\n- Component-Based\n- Declarative Rendering`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Aesthetic Injector Simulation',
      subtitle: 'Dynamic CSS Style overrides (Interactive)',
      icon: 'palette',
      color: 'text-cyan-400',
      content: (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-left w-full sm:max-w-[70%]">
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Aura AI customizes elements instantly. Select an accent color circle below to see this local slide preview change colors dynamically:
              </p>
            </div>
            
            {/* Color Rings */}
            <div className="flex-shrink-0 flex gap-3 select-none">
              {Object.keys(accentColors).map((name) => (
                <button
                  key={name}
                  onClick={() => setPreviewAccent(name)}
                  style={{ backgroundColor: accentColors[name] }}
                  className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all ${
                    previewAccent === name 
                      ? 'border-white ring-2 ring-offset-2 ring-offset-black ring-white scale-110' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  title={`${name} Accent`}
                />
              ))}
            </div>
          </div>

          {/* Interactive CSS Output Preview */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: accentColors[previewAccent] }}></span>
              <h5 className="font-bold text-[13px] text-on-surface">Style Injection Preview</h5>
            </div>
            
            <div className="grid grid-cols-2 gap-4 font-mono text-[11px] text-on-surface-variant">
              <div className="p-3 bg-black/20 rounded border border-white/5 space-y-1">
                <span className="text-primary block font-sans font-bold text-[10px] uppercase tracking-wide">DOM Styles Override</span>
                <div>{`document.documentElement.style.setProperty(`}</div>
                <div className="pl-3 text-cyan-400">{`'--accent-color', '${accentColors[previewAccent]}'`}</div>
                <div>{`);`}</div>
              </div>
              
              <div 
                className="p-3 rounded-xl border transition-all duration-300 flex flex-col justify-center items-center text-center space-y-1 shadow-md"
                style={{ 
                  borderColor: `${accentColors[previewAccent]}40`, 
                  backgroundColor: `${accentColors[previewAccent]}10` 
                }}
              >
                <span className="material-symbols-outlined text-[24px]" style={{ color: accentColors[previewAccent] }}>
                  bolt
                </span>
                <span className="font-sans font-bold text-[12px]" style={{ color: accentColors[previewAccent] }}>
                  Glow Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Query History Storage',
      subtitle: 'Clean Persistent Search Logging',
      icon: 'history',
      color: 'text-blue-400',
      content: (
        <div className="space-y-4">
          <p className="text-[13.5px] text-on-surface-variant leading-relaxed">
            History records store user search strings safely. Because the app bypasses fake mock listings:
          </p>
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="bg-surface-container/60 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[12px] font-bold text-primary block">Persistent Caching</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Inputs are cached under `aura_search_history` in local storage, loading automatically on reload.
              </p>
            </div>
            <div className="bg-surface-container/60 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[12px] font-bold text-primary block">Read-Only Layout</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Entries focus on query parameters. Stripped hover-buttons ensure layout security, leaving bulk sweeping as the only delete route.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Interactive System Overview Animation',
      subtitle: 'Dynamic Visual Connection Video Simulation',
      icon: 'movie',
      color: 'text-amber-400',
      content: <SystemOverviewAnimation />
    }
  ];

  const docsMdContent = `# Aura AI System Architecture Manual

This manual provides detailed engineering specifications for Aura AI, covering front-end components, proxy security, state management, and design patterns.

---

## 🏗️ Technical Architecture

Aura AI is built as a single-page application utilizing React, Vite, and Tailwind CSS v4.

---

## 🔒 Server-Side API Proxying

Standard client-only applications expose secrets inside the browser's Network Inspector. Aura AI eliminates this leakage using a Node-based dev proxy configured in vite.config.js:

server: {
  proxy: {
    '/api/groq': {
      target: 'https://api.groq.com/openai/v1',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\\/api\\/groq/, ''),
      headers: {
        'Authorization': \`Bearer \${env.GROQ_API_KEY}\`
      }
    }
  }
}

* Client Invocation: The client calls /api/groq/chat/completions. No authorization header is transmitted from the browser.
* Server Interception: Node intercepts the request, reads GROQ_API_KEY from the private .env environment, attaches the headers, forwards the payload, and sends back the completion data.

---

## 🧠 Analytical Depth (Reasoning Parser)

When Analytical Depth is enabled in Settings, the prompt engine instructs the model to structure its response with raw thinking logs enclosed in XML nodes.

---

## 🎨 Reactive Customizer & HSL Variables

Visual settings customize instantly in real-time, modifying variables inside the Document root element without reloading.
`;

  const downloadDocsMd = () => {
    const blob = new Blob([docsMdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'documentation.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-[1000px] w-full space-y-xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Header */}
      <header className="text-left flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[32px] font-semibold mb-2">Documentation</h2>
          <p className="text-on-surface-variant text-[16px]">
            Explore system slides to understand the engineering and design patterns behind Aura AI.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadDocsMd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-bold border border-white/10 hover:border-primary-fixed-dim/30 bg-surface-container/20 text-on-surface hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Download documentation.md</span>
        </button>
      </header>

      {/* Slide Presentation Card */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low flex flex-col min-h-[480px]">
        {/* Slide Top bar */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-surface-container-high/40">
          <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined text-[22px] ${slides[currentSlide].color} animate-pulse`}>
              {slides[currentSlide].icon}
            </span>
            <div className="text-left">
              <h3 className="font-semibold text-on-surface text-[14px]">
                {slides[currentSlide].title}
              </h3>
              <span className="text-[10px] text-on-surface-variant block uppercase tracking-wider font-mono">
                {slides[currentSlide].subtitle}
              </span>
            </div>
          </div>
          <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-on-surface-variant font-mono">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Content Workspace */}
        <div className="flex-1 p-8 flex flex-col justify-center text-left bg-surface-container/20 relative overflow-hidden">
          {/* Fading Content Wrapper */}
          <div className="animate-in fade-in slide-in-from-right-5 duration-350 flex-1 flex flex-col justify-center">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Presentation Controls */}
        <div className="px-6 py-4 border-t border-white/10 bg-surface-container-high/40 flex justify-between items-center select-none">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-all text-[13px] font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-350 cursor-pointer ${
                  currentSlide === idx 
                    ? 'bg-primary-fixed-dim scale-125 ring-2 ring-primary-fixed-dim/30' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                title={`Go to Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-fixed-dim text-on-primary hover:scale-[1.03] transition-all text-[13px] font-medium cursor-pointer"
          >
            <span>Next</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentationView;
