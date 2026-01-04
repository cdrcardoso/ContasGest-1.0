
import React, { useState, useEffect } from 'react';
import { Account, ViewState } from './types';
import { AccountList } from './components/AccountList';
import { AccountForm } from './components/AccountForm';
import { AccountDetail } from './components/AccountDetail';
import { Header } from './components/Header';
import { SecurityAssistant } from './components/SecurityAssistant';
import { PlusIcon, ShieldCheckIcon, ListIcon, LogoWatermark } from './components/Icons';
import { APP_CONFIG } from './config';

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [view, setView] = useState<ViewState>('LIST');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar dados usando a chave configurada
  useEffect(() => {
    const saved = localStorage.getItem(APP_CONFIG.storageKey);
    if (saved) {
      try {
        setAccounts(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar contas", e);
      }
    }
  }, []);

  // Gravar dados para utilização futura
  useEffect(() => {
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(accounts));
  }, [accounts]);

  const handleAddAccount = (account: Omit<Account, 'id' | 'updatedAt'>) => {
    const newAccount: Account = {
      ...account,
      id: crypto.randomUUID(),
      updatedAt: Date.now(),
    };
    setAccounts(prev => [newAccount, ...prev]);
    setView('LIST');
  };

  const handleUpdateAccount = (updatedAccount: Account) => {
    setAccounts(prev => prev.map(a => a.id === updatedAccount.id ? { ...updatedAccount, updatedAt: Date.now() } : a));
    setSelectedAccount(null);
    setView('LIST');
  };

  const handleDeleteAccount = (id: string) => {
    if (confirm('Deseja eliminar este registo?')) {
      setAccounts(prev => prev.filter(a => a.id !== id));
      setView('LIST');
    }
  };

  const filteredAccounts = accounts.filter(acc => 
    acc.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (acc.accountName && acc.accountName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const existingServices = Array.from(new Set(accounts.map(a => a.serviceName))).sort();
  const existingAccountNames = Array.from(new Set(accounts.map(a => a.accountName).filter(Boolean))).sort();
  const existingLinks = Array.from(new Set(accounts.map(a => a.accessLink).filter(Boolean))).sort();

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-slate-50 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] overflow-hidden">
        <LogoWatermark className="w-[140%] h-auto rotate-12" />
      </div>

      <Header 
        view={view} 
        onBack={() => {
            setSelectedAccount(null);
            setView('LIST');
        }} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-3 no-scrollbar relative z-10">
        {view === 'LIST' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <AccountList 
              accounts={filteredAccounts} 
              onSelect={(acc) => {
                setSelectedAccount(acc);
                setView('DETAIL');
              }} 
            />
          </div>
        )}

        {view === 'FORM' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <AccountForm 
              initialData={selectedAccount} 
              existingServices={existingServices}
              existingAccountNames={existingAccountNames}
              existingLinks={existingLinks}
              onSubmit={selectedAccount ? handleUpdateAccount : handleAddAccount} 
              onCancel={() => {
                  setSelectedAccount(null);
                  setView('LIST');
              }}
            />
          </div>
        )}

        {view === 'DETAIL' && selectedAccount && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <AccountDetail 
              account={selectedAccount} 
              onEdit={() => setView('FORM')}
              onDelete={() => handleDeleteAccount(selectedAccount.id)}
            />
          </div>
        )}

        {view === 'ASSISTANT' && (
          <SecurityAssistant />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/90 backdrop-blur-md border-t border-slate-200 px-8 py-3 flex justify-between items-center z-50 rounded-t-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        <button 
          onClick={() => { setSelectedAccount(null); setView('LIST'); }}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'LIST' ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
        >
          <ListIcon className="w-6 h-6" />
          <span className="text-[9px] font-bold uppercase">Contas</span>
        </button>

        <button 
          onClick={() => {
            setSelectedAccount(null);
            setView('FORM');
          }}
          className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-200 -mt-10 border-4 border-slate-50 hover:scale-110 active:scale-90 transition-all"
        >
          <PlusIcon className="w-6 h-6" />
        </button>

        <button 
          onClick={() => { setSelectedAccount(null); setView('ASSISTANT'); }}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'ASSISTANT' ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
        >
          <ShieldCheckIcon className="w-6 h-6" />
          <span className="text-[9px] font-bold uppercase">Segurança</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
