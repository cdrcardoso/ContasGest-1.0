
import React from 'react';
import { Account } from '../types';
import { ExternalLinkIcon, ChevronRightIcon, GlobeIcon } from './Icons';

interface AccountListProps {
  accounts: Account[];
  onSelect: (acc: Account) => void;
}

export const AccountList: React.FC<AccountListProps> = ({ accounts, onSelect }) => {
  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="bg-blue-50 p-6 rounded-full mb-4 border border-blue-100">
          <GlobeIcon className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">A sua base está vazia</h3>
        <p className="text-slate-400 text-sm mt-2 max-w-[200px]">Registe os seus serviços para começar a organizar as suas credenciais.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Headers */}
      <div className="px-4 py-1 flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        <div className="w-12">Ico</div>
        <div className="flex-1 px-3">Serviço / Nome</div>
        <div className="w-24 text-right">Utilizador</div>
        <div className="w-8 ml-2"></div>
      </div>

      <div className="space-y-1.5">
        {accounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => onSelect(acc)}
            className="w-full text-left bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-blue-100 transition-all active:bg-slate-50 flex items-center group"
          >
            {/* Service Icon Col */}
            <div className="w-10 h-10 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border border-slate-200 group-hover:from-blue-500 group-hover:to-blue-700 group-hover:text-white transition-all">
              {acc.serviceName.charAt(0).toUpperCase()}
            </div>

            {/* Service/Account Detail Col */}
            <div className="flex-1 px-4 overflow-hidden">
              <h4 className="font-bold text-slate-800 truncate text-[13px] leading-tight group-hover:text-blue-600 transition-colors">
                {acc.serviceName}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-tighter">
                {acc.accountName || 'Principal'}
              </p>
            </div>

            {/* User Col */}
            <div className="w-24 text-right overflow-hidden shrink-0">
              <p className="text-[11px] font-semibold text-slate-600 truncate">
                {acc.username || '-'}
              </p>
            </div>

            {/* Action Col */}
            <div className="w-8 ml-2 flex justify-end">
              <ChevronRightIcon className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
      
      <div className="pt-4 px-2">
        <p className="text-[10px] text-slate-400 font-medium text-center">
          A carregar {accounts.length} registos da memória local segura.
        </p>
      </div>
    </div>
  );
};
