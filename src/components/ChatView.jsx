import React, { useState, useRef, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';

const WELCOME_MESSAGE = `Welcome to Aura AI — your premium virtual assistant! 🌟

Here is a summary of how this platform works and the features available for you to explore:

⚙️ How It Works
• Live AI Engine: Powered by Groq's fast Llama 3.3 model to generate dynamic answers.
• Persistent Preferences: Settings and customization details write directly to localStorage and sync instantly.

🚀 Key Features
1. AI Personality Slider: Adjust the Response Mode in Settings to dynamically change prompt styling:
   - Precision Focused (Low): Short, structured, direct lists.
   - Creative Burst (High): Metaphorical, elaborate descriptions.
   - Balanced (Middle): Standard professional tone.
2. Analytical Depth Toggle: Extracts background reasoning logs and processes them in the background.
3. Dynamic Accent Colors: Choose Cyan, Purple, Yellow, or Red to change brand accents.
4. Themes Customizer: Choose Deep Dark, Aura Light, or High Contrast modes.
5. Interactive Tabs: Explore settings, dashboard SVGs, FAQs, and searchable histories using the Sidebar.

Start typing below to chat with Aura AI, or switch views to customize your dashboard!`;

const ChatView = ({ settings, onAddHistoryEntry, prefilledQuery, onClearPrefilledQuery }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thinking: null
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [expandedThinking, setExpandedThinking] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (prefilledQuery) {
      setInputText(prefilledQuery);
      if (onClearPrefilledQuery) {
        onClearPrefilledQuery();
      }
    }
  }, [prefilledQuery, onClearPrefilledQuery]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const toggleThinking = (msgId) => {
    setExpandedThinking(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleClearChat = () => {
    setIsConfirmOpen(true);
  };

  const executeClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinking: null
      }
    ]);
    setApiError(null);
    setIsConfirmOpen(false);
  };

  const getSliderLabel = (val) => {
    if (val < 33) return 'Precision Focused';
    if (val > 66) return 'Creative Burst';
    return 'Balanced';
  };

  const getSimulatedResponse = (userMsg) => {
    const personality = getSliderLabel(settings.personality);
    const analytical = settings.analyticalDepth;

    let thinking = null;
    let responseText = '';

    if (analytical) {
      thinking = `Analyzing query: "${userMsg}"
Checking user preferences (Personality: ${personality})
Formulating structural output layers
Applying strict constraints for ${personality} response mode...`;
    }

    const textLower = userMsg.toLowerCase();

    if (textLower.includes('hello') || textLower.includes('hi')) {
      if (personality === 'Precision Focused') {
        responseText = 'Hello. Standing by for instructions.';
      } else if (personality === 'Creative Burst') {
        responseText = 'Salutations, traveler of the digital realms! Aura AI is delighted to welcome you to this aesthetic nexus. Let us weave brilliant ideas together today.';
      } else {
        responseText = "Hello there! I'm Aura AI, ready to assist. How can I help you today?";
      }
    } else if (textLower.includes('theme') || textLower.includes('setting') || textLower.includes('color')) {
      if (personality === 'Precision Focused') {
        responseText = `Active config:
- Theme: ${settings.theme}
- Accent: ${settings.accentColor}
- Depth reasoning: ${settings.analyticalDepth ? 'ON' : 'OFF'}`;
      } else if (personality === 'Creative Burst') {
        responseText = `Your current visual environment is a beautiful expression of design! You've chose the exquisite "${settings.theme}" theme wrapped in a vibrant "${settings.accentColor}" color profile. It feels incredibly premium, doesn't it?`;
      } else {
        responseText = `You are currently experiencing the "${settings.theme}" theme with a gorgeous "${settings.accentColor}" accent color. You can tweak this configuration in the Settings tab!`;
      }
    } else {
      if (personality === 'Precision Focused') {
        responseText = `Query received. Processing task: "${userMsg}". Actions successfully logged. Response compiled with maximum precision constraints.`;
      } else if (personality === 'Creative Burst') {
        responseText = `What an intriguing thought! Taking your concept of "${userMsg}", we can envision a constellation of possibilities. The synergy between modern AI parameters and human creativity sparks a canvas of endless discoveries. Let us investigate further!`;
      } else {
        responseText = `Thanks for sharing that! Processing your prompt "${userMsg}". Let me know if you would like me to perform any specific analysis or provide more detailed suggestions.`;
      }
    }

    return { text: responseText, thinking };
  };

  const activeApiKey = settings.groqApiKey || (typeof __HAS_GROQ_API_KEY__ !== 'undefined' && __HAS_GROQ_API_KEY__ ? 'proxy_active' : '');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setApiError(null);
    const userMessageText = inputText;
    
    // Save to local search history
    if (onAddHistoryEntry) {
      onAddHistoryEntry(userMessageText);
    }

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thinking: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    if (activeApiKey) {
      // 1. Live API call to Groq
      try {
        const personality = getSliderLabel(settings.personality);
        const analytical = settings.analyticalDepth;

        // Build system prompt based on settings
        let systemInstruction = `You are Aura AI, a premium virtual assistant with a highly polished design aesthetic.
Current user interface theme: ${settings.theme}
Current brand color: ${settings.accentColor}

You must strictly adjust your speaking style to match the user's selected personality profile:
`;

        if (personality === 'Precision Focused') {
          systemInstruction += `- You are in Precision Focused mode. Respond in a highly concise, factual, direct, and structured manner. Use markdown lists or bullet points if appropriate. Avoid greetings, pleasantries, small talk, and conversational fillers.\n`;
        } else if (personality === 'Creative Burst') {
          systemInstruction += `- You are in Creative Burst mode. Respond using rich, descriptive, expressive, and flowery language. Use vivid metaphors, paint pictures with words, and explore ideas from unique, inspiring angles.\n`;
        } else {
          systemInstruction += `- You are in Balanced mode. Respond in a helpful, friendly, professional, and well-rounded manner.\n`;
        }

        if (analytical) {
          systemInstruction += `\nCRITICAL DIRECTIVE: Before outputting your final response, you MUST output a detailed, step-by-step thinking process wrapped inside a <thinking>...</thinking> XML block. In this block, document your breakdown of the user's query, note any style guidelines, and plan your response. Do not place any other content outside this tag except the final response. Example:
<thinking>
1. Deconstructing user prompt...
2. Structuring response under ${personality} requirements...
</thinking>
Final response text goes here.`;
        } else {
          systemInstruction += `\nDo NOT include any <thinking> blocks or step-by-step reasoning steps. Reply directly with your response.`;
        }

        // Prepare conversation history
        const apiMessages = [
          { role: 'system', content: systemInstruction },
          ...messages.map(m => {
            if (m.sender === 'user') {
              return { role: 'user', content: m.text };
            } else {
              const fullContent = m.thinking 
                ? `<thinking>\n${m.thinking}\n</thinking>\n\n${m.text}` 
                : m.text;
              return { role: 'assistant', content: fullContent };
            }
          }),
          { role: 'user', content: userMessageText }
        ];

        const fetchUrl = activeApiKey === 'proxy_active' 
          ? '/api/groq/chat/completions' 
          : 'https://api.groq.com/openai/v1/chat/completions';

        const fetchHeaders = {
          'Content-Type': 'application/json'
        };

        if (activeApiKey !== 'proxy_active') {
          fetchHeaders['Authorization'] = `Bearer ${activeApiKey}`;
        }

        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: fetchHeaders,
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: apiMessages,
            temperature: settings.personality / 100, // convert 0-100 to 0-1
            max_tokens: 1024
          })
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody?.error?.message || `Groq API responded with status ${response.status}`);
        }

        const data = await response.json();
        const fullResponseText = data.choices[0].message.content || '';

        // Extract thinking process
        const thinkingMatch = fullResponseText.match(/<thinking>([\s\S]*?)<\/thinking>/i);
        let thinking = null;
        let responseText = fullResponseText;

        if (thinkingMatch) {
          thinking = thinkingMatch[1].trim();
          responseText = fullResponseText.replace(/<thinking>([\s\S]*?)<\/thinking>/i, '').trim();
        }

        const aiMessage = {
          id: Date.now().toString(),
          sender: 'ai',
          text: responseText || 'Success. Standby for further requests.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thinking: thinking
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (err) {
        console.error('Groq Live API Error:', err);
        setApiError(err.message || 'Network error connecting to Groq.');
        
        // Fallback to simulated response
        const simulated = getSimulatedResponse(userMessageText);
        const aiMessage = {
          id: Date.now().toString(),
          sender: 'ai',
          text: `[API Error Fallback] ${simulated.text}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thinking: simulated.thinking ? `Error fallback triggered: ${err.message}\n\n${simulated.thinking}` : null
        };
        setMessages(prev => [...prev, aiMessage]);
      } finally {
        setIsTyping(false);
      }
    } else {
      // 2. Simulated Response Mode (no API key)
      setTimeout(() => {
        const simulated = getSimulatedResponse(userMessageText);
        const aiMessage = {
          id: Date.now().toString(),
          sender: 'ai',
          text: simulated.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thinking: simulated.thinking
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1200);
    }
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="max-w-[1100px] w-full h-full flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Active Model Header */}
      <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-surface-container/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center border border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
          </div>
          <div>
            <h3 className="font-semibold text-on-surface text-[15px]">
              {activeApiKey ? 'Llama 3.3 (Groq API)' : 'Aura Core (Simulated)'}
            </h3>
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Mode: {getSliderLabel(settings.personality)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-on-surface-variant hidden sm:inline-block">
            {settings.analyticalDepth ? 'Reasoning Active' : 'Direct Output'}
          </span>
          <button
            type="button"
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error-container/10 border border-error/20 text-error hover:bg-error-container/20 transition-all text-[12px] font-medium cursor-pointer select-none"
            title="Clear Conversation"
          >
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Error Alert Bar */}
      {apiError && (
        <div className="bg-error-container/20 border-b border-error/20 px-6 py-2 flex items-center gap-2 text-error text-[12px] font-sans">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          <span>API Request Failed: {apiError}. Simulated output fallback activated.</span>
        </div>
      )}

      {/* Messages Window */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className="max-w-[80%] space-y-1">
              {/* Text Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-lg whitespace-pre-wrap border ${
                  msg.sender === 'user'
                    ? 'bg-primary-fixed-dim border-transparent text-on-primary rounded-tr-none'
                    : 'bg-[#0a2316]/70 border-emerald-500/20 text-[#e6f4ea] rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-on-surface-variant/60 block px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="bg-surface-container border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none text-on-surface shadow-md">
              <div className="flex gap-1.5 items-center py-1">
                <span className="w-2.5 h-2.5 bg-primary-fixed-dim rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2.5 h-2.5 bg-primary-fixed-dim rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2.5 h-2.5 bg-primary-fixed-dim rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Tray */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-surface-container-low/80 backdrop-blur-md flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={activeApiKey ? "Ask Aura AI (powered by Groq)..." : "Ask Aura (Simulated mode)..."}
          className="flex-1 px-4 py-3 bg-surface-container border border-white/10 rounded-xl text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors text-[15px]"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="w-12 h-12 rounded-xl bg-primary-fixed-dim text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none transition-all cursor-pointer flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">send</span>
        </button>
      </form>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Clear Conversation"
        message="Are you sure you want to clear this conversation history? This action cannot be undone."
        onConfirm={executeClearChat}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default ChatView;
