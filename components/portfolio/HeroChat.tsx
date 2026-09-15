'use client';

import { useState, useRef, useEffect, type JSX, type FormEvent } from 'react';
import { GlassLoadingBall } from './GlassLoadingBall';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'ai',
    text: "Hello! I'm **Arsh's AI Assistant**. Ask me anything strictly about his verified resume — including his **projects (SkillCAD EV, SwiftTrans, Git)**, **internship at SyinQ**, **skills**, **education at Bennett University**, and **competitive programming**.",
    time: 'Just now',
  },
];

const SUGGESTIONS = [
  '✦ Tell me about Arsh',
  '✦ SkillCAD EV & SwiftTrans',
  '✦ SyinQ Internship',
  '✦ Skills & LeetCode (550+)',
  '✦ Education & Research',
];

function formatMarkdown(text: string): JSX.Element {
  // Simple markdown renderer for bold, links, and bullet points
  const lines = text.split('\n');
  return (
    <div className="pf-chat-md">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="pf-chat-space" />;

        // Check for bullet
        const isBullet = line.startsWith('• ') || line.startsWith('✦ ') || line.startsWith('- ');
        const content = isBullet ? line.replace(/^[•✦-]\s*/, '') : line;

        // Process bold and links
        const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((chunk, cIdx) => {
          if (chunk.startsWith('**') && chunk.endsWith('**')) {
            return <strong key={cIdx}>{chunk.slice(2, -2)}</strong>;
          }
          const linkMatch = chunk.match(/^\[(.*?)\]\((.*?)\)$/);
          if (linkMatch) {
            return (
              <a
                key={cIdx}
                href={linkMatch[2]}
                target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="pf-chat-link"
              >
                {linkMatch[1]}
              </a>
            );
          }
          return chunk;
        });

        if (isBullet) {
          return (
            <div key={idx} className="pf-chat-bullet-row">
              <span className="pf-chat-bullet-dot">✦</span>
              <span>{parts}</span>
            </div>
          );
        }

        return <p key={idx}>{parts}</p>;
      })}
    </div>
  );
}

function ArrowUpIcon(): JSX.Element {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 12.6667V3.33333M12.6667 8L8 3.33333L3.33333 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroChat(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setExpanded(true);
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      const aiReply = data?.reply || "I'm ready to answer any questions about Arsh's projects and experience.";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I couldn't reach the server right now. Feel free to explore the sections below or reach out at **arshsrivastava00@gmail.com**!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
    setExpanded(false);
    setInput('');
  };

// No import of liquid-glass-react needed anymore

return (
  <div className={`pf-hero-chat-container ${expanded ? 'pf-chat-expanded' : 'pf-chat-collapsed'}`}>
    {/* Top Glass Bar */}
    {expanded && (
      <div className="pf-hero-chat-header">
        <div className="pf-hero-chat-status">
          <GlassLoadingBall label="Arsh's AI Assistant" classNameText="mono pf-chat-title" colorFrom='#26f635' colorTo='#26f635' />
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="mono pf-chat-reset-btn"
          title="Reset conversation"
        >
          CLEAR
        </button>
      </div>
    )}

    {/* Messages Feed */}
    {expanded && (
      <>
        <div className="pf-hero-chat-messages" aria-live="polite" aria-relevant="additions">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`pf-chat-msg-row ${m.sender === 'user' ? 'pf-msg-user-row' : 'pf-msg-ai-row'}`}
            >
              <div className={`pf-chat-bubble ${m.sender === 'user' ? 'pf-bubble-user' : 'pf-bubble-ai'}`}>
                <div className="pf-chat-bubble-content">
                  {formatMarkdown(m.text)}
                </div>
                <span className="mono pf-chat-time">{m.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="pf-chat-msg-row pf-msg-ai-row">
              <div className="pf-chat-bubble pf-bubble-ai pf-bubble-loading">
                <GlassLoadingBall label="Synthesizing response..." />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Suggestions */}
        {messages.length <= 2 && !loading && (
          <div className="pf-chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="mono pf-chat-chip"
                onClick={() => sendMessage(s.replace(/^✦\s*/, ''))}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </>
    )}

    {/* Glass Input Bar */}
      <form className="pf-chat-demo-input-main" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Arsh's work..."
          className="pf-chat-input"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="pf-chat-send-btn"
          aria-label="Send message"
        >
          <ArrowUpIcon />
        </button>
      </form>

    {/* Hidden SVG distortion filter, used by backdrop-filter below */}
    <svg className="pf-glass-defs" aria-hidden="true">
      <filter id="pf-liquid-distortion">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  </div>
);
}