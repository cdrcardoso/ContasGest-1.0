
import React from 'react';
import { ViewState } from '../types';
import { ChevronLeftIcon, SearchIcon, XIcon, SaveIcon } from './Icons';

interface HeaderProps {
  view: ViewState;
  onBack: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ view, onBack, searchTerm, setSearchTerm }) => {
  const getTitle = () => {
    switch (view) {
      case 'FORM': return 'Detalhes da Conta';
      case 'DETAIL': return 'Detalhes do Serviço';
      case 'ASSISTANT': return 'Consultor de Segurança IA';
      default: return 'Os Meus Serviços';
    }
  };

  const isForm = view === 'FORM';

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40 transition-all">
      <div className="flex items-center justify-between">
        {isForm ? (
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 text-slate-400 hover:text-rose-500 transition-colors"
            title="Cancelar"
          >
            <XIcon className="w-5 h-5" />
          </button>
        ) : view !== 'LIST' ? (
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-9" />
        )}

        <h1 className="text-base font-bold text-slate-800 tracking-tight">{getTitle()}</h1>

        {isForm ? (
          <button 
            type="submit" 
            form="account-form"
            className="p-2 -mr-2 text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1"
            title="Guardar"
          >
            <span className="hidden sm:inline">Guardar</span>
            <SaveIcon className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {view === 'LIST' && (
        <div className="relative mt-3">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar serviços ou utilizadores..."
            className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </header>
  );
};
