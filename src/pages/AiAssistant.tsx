import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAiGuidance } from '../services/gemini';
import { Send, Bot, User as UserIcon, Loader2, Globe, Shield, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AiAssistant() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: `Hello! I'm your Impex AI Assistant. I can help you with product sourcing, export documentation, and understanding how to save on shipping. What's on your mind today?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const context = `User Role: ${profile?.role}. User Name: ${profile?.displayName}.`;
    const response = await getAiGuidance(userMessage, context);

    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setLoading(false);
  };

  const suggestions = profile?.role === 'seller' 
    ? ["How do I get an HS code?", "Packaging for textiles", "Export docs for USA"]
    : ["Best spices from Kerala", "How group orders work", "Import duties for UK"];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center space-x-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
          <Bot className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Impex AI Assistant</h2>
          <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Online & Ready to Help</p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-start space-x-4",
              msg.role === 'user' ? "flex-row-reverse space-x-reverse" : ""
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
              msg.role === 'ai' ? "bg-indigo-50 text-indigo-600" : "bg-gray-900 text-white"
            )}>
              {msg.role === 'ai' ? <Bot className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
            </div>
            <div className={cn(
              "max-w-[80%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm",
              msg.role === 'ai' 
                ? "bg-gray-50 text-gray-800 rounded-tl-none" 
                : "bg-indigo-600 text-white rounded-tr-none"
            )}>
              <div className="markdown-body prose prose-sm max-w-none prose-indigo">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div className="bg-gray-50 p-5 rounded-[2rem] rounded-tl-none shadow-sm">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-100 bg-white">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => { setInput(s); }}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold hover:bg-indigo-100 transition-colors border border-indigo-100"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about exports, products, or shipping..."
            className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
