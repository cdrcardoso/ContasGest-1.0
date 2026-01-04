
import React, { useState } from 'react';
import { Account } from '../types';
import { generatePasswordRules } from '../services/geminiService';
import { SparklesIcon } from './Icons';

interface AccountFormProps {
  initialData: Account | null;
  existingServices: string[];
  existingAccountNames: string[];
  existingLinks: string[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const AccountForm: React.FC<AccountFormProps> = ({ 
  initialData, 
  existingServices, 
  existingAccountNames,
  existingLinks,
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    serviceName: initialData?.serviceName || '',
    accessLink: initialData?.accessLink || '',
    accountName: initialData?.accountName || '',
    username: initialData?.username || '',
    passwordRules: initialData?.passwordRules || '',
    helpText: initialData?.helpText || '',
    notes: initialData?.notes || '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceName) return alert('O Nome do Serviço é obrigatório');
    onSubmit(initialData ? { ...formData, id: initialData.id } : formData);
  };

  const handleAISuggestRules = async () => {
    if (!formData.serviceName) {
      alert('Introduza o nome do serviço para sugestões IA.');
      return;
    }
    setIsGenerating(true);
    const data = await generatePasswordRules(formData.serviceName);
    setFormData(prev => ({
      ...prev,
      passwordRules: data.rules + " - " + data.suggestion
    }));
    setIsGenerating(false);
  };

  const labelStyle = "block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5";
  const inputStyle = "w-full bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300";

  return (
    <form id="account-form" onSubmit={handleSubmit} className="space-y-1.5 pb-4">
      <div className="space-y-2 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <label className={labelStyle}>Nome do Serviço *</label>
          <input
            type="text"
            required
            list="service-suggestions"
            className={inputStyle}
            value={formData.serviceName}
            placeholder="ex: Gmail, Netflix..."
            onChange={e => setFormData({ ...formData, serviceName: e.target.value })}
          />
          <datalist id="service-suggestions">
            {existingServices.map(service => (
              <option key={service} value={service} />
            ))}
          </datalist>
        </div>

        <div>
          <label className={labelStyle}>Link de Acesso (URL)</label>
          <input
            type="url"
            list="link-suggestions"
            className={inputStyle}
            value={formData.accessLink}
            placeholder="https://..."
            onChange={e => setFormData({ ...formData, accessLink: e.target.value })}
          />
          <datalist id="link-suggestions">
            {existingLinks.map(link => (
              <option key={link} value={link} />
            ))}
          </datalist>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelStyle}>Nome da Conta</label>
            <input
              type="text"
              list="account-name-suggestions"
              className={inputStyle}
              value={formData.accountName}
              placeholder="ex: Pessoal"
              onChange={e => setFormData({ ...formData, accountName: e.target.value })}
            />
            <datalist id="account-name-suggestions">
              {existingAccountNames.map(name => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={labelStyle}>Utilizador / E-mail</label>
            <input
              type="text"
              className={inputStyle}
              value={formData.username}
              placeholder="utilizador"
              onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Ajuda / Contexto de Recuperação</label>
          <input
            type="text"
            className={inputStyle}
            value={formData.helpText}
            placeholder="Pergunta seg., telefone..."
            onChange={e => setFormData({ ...formData, helpText: e.target.value })}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className={labelStyle}>Regras de Senha</label>
            <button 
              type="button" 
              onClick={handleAISuggestRules}
              disabled={isGenerating}
              className="text-[8px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold flex items-center gap-1 hover:bg-indigo-100"
            >
              <SparklesIcon className="w-2.5 h-2.5" />
              {isGenerating ? 'A GERAR...' : 'IA'}
            </button>
          </div>
          <textarea
            className={`${inputStyle} h-11 resize-none text-[13px]`}
            value={formData.passwordRules}
            placeholder="Requisitos..."
            onChange={e => setFormData({ ...formData, passwordRules: e.target.value })}
          />
        </div>

        <div>
          <label className={labelStyle}>Observações Extra</label>
          <textarea
            className={`${inputStyle} h-11 resize-none text-[13px]`}
            value={formData.notes}
            placeholder="Notas..."
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
      </div>
      
      <div className="px-4 text-center">
        <p className="text-[9px] text-slate-400 font-medium">
          Confirme no botão "Guardar" no topo do ecrã.
        </p>
      </div>
    </form>
  );
};
