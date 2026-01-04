
import React, { useState } from 'react';
import { Account } from '../types';
import { getSecurityAdvice } from '../services/geminiService';
import { 
  ExternalLinkIcon, 
  EditIcon, 
  TrashIcon, 
  CopyIcon, 
  ShieldCheckIcon,
  SparklesIcon,
  InfoIcon,
  StickyNoteIcon,
  KeyIcon,
  UserIcon
} from './Icons';

interface AccountDetailProps {
  account: Account;
  onEdit: () => void;
  onDelete: () => void;
}

export const AccountDetail: React.FC<AccountDetailProps> = ({ account, onEdit, onDelete }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const fetchAdvice = async () => {
    setLoadingAdvice(true);
    const text = await getSecurityAdvice(account.serviceName, account.passwordRules);
    setAdvice(text);
    setLoadingAdvice(false);
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const DetailItem = ({ icon: Icon, label, value, canCopy = false }: any) => (
    <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-sm mb-1">
      <div className="w-7 h-7 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">{label}</p>
        <p className="text-slate-800 font-medium truncate text-[13px] leading-tight">{value || '---'}</p>
      </div>
      {canCopy && value && (
        <button onClick={() => copyToClipboard(value)} className="p-1.5 text-slate-300 hover:text-blue-500 transition-all">
          <CopyIcon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <div className="pb-4">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl text-white shadow-lg mb-3 relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center font-bold text-lg border border-white/30">
              {account.serviceName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">{account.serviceName}</h2>
              <p className="text-blue-100 text-[10px] opacity-80 uppercase tracking-tighter">{account.accountName || 'Principal'}</p>
            </div>
          </div>
          
          <div className="flex gap-1.5">
            {account.accessLink && (
              <a href={account.accessLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-blue-600 rounded-lg shadow-sm">
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            )}
            <button onClick={onEdit} className="p-2 bg-white/20 text-white rounded-lg border border-white/20">
              <EditIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-0.5">
        <DetailItem icon={UserIcon} label="Utilizador" value={account.username} canCopy />
        <DetailItem icon={InfoIcon} label="Ajuda / Recuperação" value={account.helpText} />
        <DetailItem icon={KeyIcon} label="Regras de Senha" value={account.passwordRules} />
        <DetailItem icon={StickyNoteIcon} label="Observações" value={account.notes} />
      </div>

      <div className="mt-3 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-[10px] text-indigo-700 uppercase tracking-widest">Consultor IA</h3>
          {!advice && !loadingAdvice && (
            <button onClick={fetchAdvice} className="text-[9px] bg-indigo-600 text-white px-2 py-1 rounded-full font-bold">
              ANLISAR SEGURANÇA
            </button>
          )}
        </div>

        {loadingAdvice ? (
          <div className="h-4 flex items-center justify-center gap-1">
             <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce"></div>
             <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
             <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
          </div>
        ) : advice && (
          <div className="text-indigo-800 text-[11px] leading-relaxed max-h-20 overflow-y-auto">
            {advice}
          </div>
        )}
      </div>

      <button 
        onClick={onDelete}
        className="w-full mt-4 text-rose-500 font-bold py-2.5 rounded-xl border border-rose-100 hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
      >
        <TrashIcon className="w-3.5 h-3.5" />
        Eliminar Registo
      </button>
    </div>
  );
};
