import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Minimize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
}

const N8N_WEBHOOK_URL =
  'https://asritha.app.n8n.cloud/webhook/11922777-828d-47d8-a00b-9bf53220d214/chat';
const N8N_TEST_WEBHOOK_URL =
  'https://asritha.app.n8n.cloud/webhook-test/11922777-828d-47d8-a00b-9bf53220d214/chat';

const QUICK_PROMPTS = [
  'Tell me about your luxury suits',
  'Do you have Banarasi silk sarees?',
  'What coupon codes are available?',
  'How do I track my order?',
  'What is your return policy?'
];

export const Chatbot: React.FC = () => {
  const { navigate } = useShop();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('navera_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: 'Welcome to NAVÉRA. I am your Atelier Stylist & Concierge, powered by our intelligence workflow. How may I assist your style curation today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('navera_chat_session_id');
      if (saved) return saved;
      const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem('navera_chat_session_id', newId);
      return newId;
    } catch {
      return `session-${Date.now()}`;
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync chat history
  useEffect(() => {
    try {
      localStorage.setItem('navera_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.warn('LocalStorage error saving chat', e);
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    const freshSession = `session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    setSessionId(freshSession);
    localStorage.setItem('navera_chat_session_id', freshSession);
    const initial: ChatMessage[] = [
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: 'Conversation refreshed. Welcome to NAVÉRA. How can I assist you with sizes, tailored pieces, or order logistics?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(initial);
  };

  const parseN8nResponse = async (response: Response): Promise<string> => {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();

      // n8n returns various formats depending on nodes used:
      // { output: "..." } or { text: "..." } or { message: "..." } or [{ output: "..." }]
      if (Array.isArray(data)) {
        const first = data[0];
        if (typeof first === 'string') return first;
        if (first?.output) return first.output;
        if (first?.text) return first.text;
        if (first?.message) return first.message;
        if (first?.response) return first.response;
        return JSON.stringify(first);
      }

      if (data && typeof data === 'object') {
        if (data.output) return String(data.output);
        if (data.text) return String(data.text);
        if (data.message) return String(data.message);
        if (data.response) return String(data.response);
        if (data.data) return typeof data.data === 'string' ? data.data : JSON.stringify(data.data);
        return JSON.stringify(data);
      }

      return String(data);
    } else {
      const rawText = await response.text();
      return rawText || 'Thank you for your message. How else may I assist you?';
    }
  };

  const sendMessageToN8n = async (userText: string) => {
    const payload = {
      action: 'sendMessage',
      chatInput: userText,
      message: userText,
      question: userText,
      sessionId: sessionId
    };

    // First attempt the production webhook
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        return await parseN8nResponse(res);
      }

      // If production returned 404, try the test webhook
      if (res.status === 404) {
        try {
          const testRes = await fetch(N8N_TEST_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json, text/plain, */*'
            },
            body: JSON.stringify(payload)
          });
          if (testRes.ok) {
            return await parseN8nResponse(testRes);
          }
        } catch {
          // ignore test fallback error
        }

        // Return a graceful notification explaining how to activate in n8n while providing styling context
        return handleFallbackResponse(userText);
      }

      throw new Error(`n8n webhook responded with status ${res.status}`);
    } catch (err: any) {
      console.warn('n8n webhook error, using concierge assistant fallback:', err);
      return handleFallbackResponse(userText);
    }
  };

  // Luxury local fallback knowledge base if the webhook is temporarily inactive/404 in n8n
  const handleFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('suit') || q.includes('blazer') || q.includes('formal')) {
      return 'Our signature Bespoke Midnight Two-Piece Formal Suit is hand-tailored in Italy from Super 130s Merino Wool (₹8,999) with full canvas interlining. We also offer the Classic Navy Wool Blazer (₹4,999) with gold-plated button accents. You can explore these in the Men\'s or Formal Wear section!';
    }
    if (q.includes('saree') || q.includes('ethnic') || q.includes('anarkali') || q.includes('kurti')) {
      return 'Our Heritage Ethnic Wear features authentic hand-woven Banarasi Katan Silk Sarees with antique gold kadwa jaal (₹7,999, Silk Mark certified) and royal 24-kali embroidered Anarkali ensembles (₹6,499). Explore them under Collections > Festive or Ethnic Wear!';
    }
    if (q.includes('coupon') || q.includes('discount') || q.includes('code') || q.includes('sale') || q.includes('offer')) {
      return 'You can use code **NAVY10** for 10% off your order, **WELCOME15** for 15% off first-time acquisitions, or **STYLE20** on seasonal promotions. In addition, our Flash Sale offers up to 50% off select pieces with complimentary delivery on orders over ₹1,999.';
    }
    if (q.includes('track') || q.includes('order') || q.includes('delivery') || q.includes('shipping')) {
      return 'You can track your order anytime on our "Track Order" page using your reference number (e.g. NAV-2026-9841). Standard insured delivery takes 3–5 business days, while our VIP Express White Glove courier delivers in 24–48 hours.';
    }
    if (q.includes('return') || q.includes('exchange') || q.includes('refund')) {
      return 'NAVÉRA offers a 7-day hassle-free doorstep return and exchange policy on all unworn items with original seals and garment dust bags intact.';
    }

    return `Thank you for your message! Your query has been noted for our n8n styling pipeline. 

*(Note: To activate your live n8n workflow, please ensure the workflow toggle in the top-right of your n8n canvas is switched to 'Active' at https://asritha.app.n8n.cloud).* 

In the meantime, feel free to ask me about our Italian tailored blazers, Banarasi sarees, promo codes (NAVY10), sizing, or order tracking!`;
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToN8n(messageText);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'Our styling desk is temporarily reconnecting. Please feel free to browse our collections or contact concierge@navera.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white/95 text-[#0B1B3D] border border-[#C6A867]/40 shadow-xl rounded-full text-xs font-semibold tracking-wide cursor-pointer hover:border-[#C6A867] transition-all animate-bounce-subtle"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A867]" />
            <span>Atelier Stylist & Concierge</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat' : 'Open concierge chat'}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0B1B3D] to-[#061024] text-[#FAF9F5] border-2 border-[#C6A867] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
        >
          {/* Subtle gold glow ring */}
          <div className="absolute inset-0 rounded-full bg-[#C6A867]/20 blur-md group-hover:bg-[#C6A867]/40 transition-colors pointer-events-none" />

          {isOpen ? (
            <X className="w-6 h-6 text-[#C6A867] relative z-10 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 text-[#C6A867] relative z-10" />
              {/* Online pulse indicator */}
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0B1B3D] z-10" />
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-full h-[580px] max-h-[85vh] bg-[#FAF9F5] border border-[#C6A867]/50 rounded-sm shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#0B1B3D] text-[#FAF9F5] p-4 border-b border-[#C6A867]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#061024] border border-[#C6A867]/50 flex items-center justify-center text-[#C6A867]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-bold text-white tracking-wide">
                    NAVÉRA Concierge
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-[#C6A867] tracking-wider uppercase">
                  Connected via n8n Agent Workflow
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <button
                onClick={handleClearHistory}
                title="Restart conversation"
                className="p-1.5 hover:text-[#C6A867] hover:bg-white/10 rounded-xs transition-colors"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 hover:text-[#C6A867] hover:bg-white/10 rounded-xs transition-colors"
                aria-label="Close chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Category Action Pill Bar */}
          <div className="px-3 py-2 bg-[#061024] border-b border-white/10 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('collections');
              }}
              className="px-2.5 py-0.5 rounded-xs bg-white/10 hover:bg-[#C6A867] hover:text-[#0B1B3D] text-slate-200 transition-colors whitespace-nowrap"
            >
              Collections
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('new-arrivals');
              }}
              className="px-2.5 py-0.5 rounded-xs bg-white/10 hover:bg-[#C6A867] hover:text-[#0B1B3D] text-slate-200 transition-colors whitespace-nowrap"
            >
              New Arrivals
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('sale');
              }}
              className="px-2.5 py-0.5 rounded-xs bg-white/10 hover:bg-[#C6A867] hover:text-[#0B1B3D] text-slate-200 transition-colors whitespace-nowrap"
            >
              Sale (50% Off)
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('order-tracking');
              }}
              className="px-2.5 py-0.5 rounded-xs bg-white/10 hover:bg-[#C6A867] hover:text-[#0B1B3D] text-slate-200 transition-colors whitespace-nowrap"
            >
              Track Order
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#0B1B3D] text-[#C6A867] border border-[#C6A867]/40 flex items-center justify-center shrink-0 text-xs font-serif font-bold mt-1">
                    N
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 text-xs leading-relaxed rounded-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0B1B3D] text-[#FAF9F5] border border-[#0B1B3D]'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1.5 text-right font-mono ${
                      msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#C6A867] text-[#0B1B3D] flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-[#0B1B3D] text-[#C6A867] flex items-center justify-center shrink-0 text-xs font-serif font-bold">
                  N
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-sm shadow-2xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C6A867] animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-[#C6A867] animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#C6A867] animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Queries */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200 flex gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-white hover:bg-[#FAF9F5] text-slate-700 hover:text-[#0B1B3D] border border-slate-200 hover:border-[#C6A867] rounded-xs whitespace-nowrap transition-colors disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about tailored suits, sizes, Banarasi sarees, coupons..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D] placeholder-slate-400 disabled:opacity-60"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#C6A867] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 rounded-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span>n8n Webhook: 11922777-828d-47d8-a00b-9bf53220d214/chat</span>
              <span className="font-mono text-[#C6A867]">NAVÉRA AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
