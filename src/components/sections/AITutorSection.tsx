import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2, BookOpen, RefreshCw, Atom } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AITutorSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `Hello! I am your **StereoChem 3D AI Chemistry Tutor**, specialized in undergraduate (B.Sc.) and postgraduate (M.Sc.) organic stereochemistry.

Feel free to ask me anything about:
- **Cahn-Ingold-Prelog (CIP) priority rules** and tie-breaking algorithms.
- **(R)/(S)** and **(E)/(Z)** stereodescriptors.
- **Enantiomers, Diastereomers, and Meso compounds**.
- **Fischer, Newman, and Sawhorse projections**.
- **Conformational analysis** (cyclohexane chair flips, A-values, butane rotamers).
- **Optical activity**, polarimetry, and enantiomeric excess (% ee).

How can I help you master stereochemistry today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    'Explain CIP priority tie-breaking with an example',
    'Why is meso-tartaric acid optically inactive?',
    'How do I convert a Fischer projection to a Newman projection?',
    'What is the difference between enantiomers and diastereomers?',
    'Explain the 1,3-diaxial interaction in cyclohexane',
    'Why is (R)-thalidomide safe but (S)-thalidomide teratogenic?',
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach tutor service');
      }

      const data = await response.json();
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: data.reply || 'Unable to generate chemical explanation.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'tutor',
        text: `I encountered an issue connecting to the AI tutor backend. Please try again or check your query.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 h-[calc(100vh-140px)] min-h-[640px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>AI Chemistry Tutor • Gemini 3.8 Flash</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Organic Stereochemistry AI Professor
          </h1>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
          }}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center gap-1.5 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-thin">
        <span className="text-slate-400 font-semibold whitespace-nowrap text-[11px] mr-1">Suggestions:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-violet-950/40 text-slate-300 hover:text-violet-300 border border-slate-800 hover:border-violet-500/30 whitespace-nowrap transition-all text-xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 overflow-y-auto flex flex-col gap-4 shadow-xl backdrop-blur-xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none prose prose-invert max-w-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
              <span
                className={`block text-[10px] mt-2 font-mono ${
                  msg.sender === 'user' ? 'text-slate-800 text-right' : 'text-slate-500 text-left'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 mr-auto text-slate-400 text-xs">
            <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/40 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
              <span>Analyzing stereochemical principles...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any stereochemistry question (e.g. How to assign R/S when H is on wedge?)..."
          className="flex-1 bg-transparent px-3 py-2 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-violet-500 hover:bg-violet-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-md shadow-violet-500/20"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
