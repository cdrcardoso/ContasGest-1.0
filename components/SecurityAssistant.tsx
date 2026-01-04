
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SparklesIcon, ShieldCheckIcon, SendIcon } from './Icons';
import { APP_CONFIG } from '../config';

export const SecurityAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: "Olá! Sou o seu Consultor de Segurança. Pergunte-me qualquer coisa sobre como criar regras de senha fortes, proteger as suas contas na internet ou compreender as definições de privacidade."}
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMsg = query.trim();
    setQuery('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: APP_CONFIG.ai.model,
        contents: userMsg,
        config: {
          systemInstruction: APP_CONFIG.ai.instructions.assistant,
          temperature: APP_CONFIG.ai.temperature,
        }
      });
      setMessages(prev => [...prev, {role: 'bot', text: response.text}]);
    } catch (e) {
      setMessages(prev => [...prev, {role: 'bot', text: "Desculpe, encontrei um erro ao ligar-me ao meu cérebro digital. Por favor, tente novamente."}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm flex-1 mb-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-none text-slate-400 text-xs italic animate-pulse">
              O Gemini está a pensar...
            </div>
          </div>
        )}
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          className="w-full bg-white border border-slate-200 rounded-2xl pl-4 pr-12 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-lg shadow-slate-200/50"
          placeholder="Faça uma pergunta de segurança..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-xl shadow-md active:scale-95 transition-all disabled:opacity-50"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 pb-2">
        <QuickPrompt label="Criar regra segura" icon={ShieldCheckIcon} onClick={() => setQuery(`Como posso criar uma regra de senha segura para uma conta bancária?`)} />
        <QuickPrompt label="Benefícios 2FA" icon={SparklesIcon} onClick={() => setQuery(`Quais são os benefícios de usar uma chave de segurança física para 2FA?`)} />
      </div>
    </div>
  );
};

const QuickPrompt = ({ label, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="bg-indigo-50 text-indigo-700 p-3 rounded-2xl text-[10px] font-bold flex flex-col items-center gap-1.5 border border-indigo-100 active:scale-95 transition-all hover:bg-indigo-100"
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);
