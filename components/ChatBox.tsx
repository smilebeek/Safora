
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onLocate: (lat: number, lng: number) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage, isLoading, onLocate }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl border border-red-50 overflow-hidden">
      <div className="p-4 border-b border-red-100 bg-white flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-orange-400 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="font-extrabold text-slate-900 tracking-tight text-lg">Safora <span className="text-orange-500">AI</span></span>
        </div>
        <div className="flex items-center space-x-1">
           <span className="text-[10px] font-black text-red-400 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-full">Live Mapping</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-slate-50/20">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-8 py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-orange-200 rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Discover with Safora</h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">I'm your personal explorer. Tell me where you dream of going, and I'll map out your perfect journey.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] rounded-2xl p-4 shadow-sm border ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400 text-white rounded-tr-none' 
                : 'bg-white border-red-100 text-slate-800 rounded-tl-none'
            }`}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</div>
              
              {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                <div className="mt-4 pt-3 border-t border-red-50">
                  <div className="flex flex-wrap gap-2">
                    {msg.groundingLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center bg-orange-50 hover:bg-orange-100 rounded-lg p-1 pr-2 transition-all group">
                        {link.coordinates && (
                          <button 
                            onClick={() => onLocate(link.coordinates!.lat, link.coordinates!.lng)}
                            className="p-1.5 bg-white text-orange-600 rounded-md transition-all shadow-sm group-hover:bg-red-500 group-hover:text-white mr-1"
                            title="Find on Map"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                          </button>
                        )}
                        <a 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-orange-800 truncate max-w-[120px]"
                        >
                          {link.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <span className="text-[10px] mt-1.5 px-1 font-bold text-slate-400 uppercase tracking-tighter">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-red-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-red-50">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Plan my trip to Santorini..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400 font-medium"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl px-4 hover:shadow-lg hover:shadow-orange-200 disabled:opacity-50 disabled:grayscale transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-center text-red-300 mt-3 font-black uppercase tracking-widest">Safora • Global Concierge</p>
      </div>
    </div>
  );
};

export default ChatBox;
