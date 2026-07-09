import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import SettingsView from './components/SettingsView';
import ChatView from './components/ChatView';
import HistoryView from './components/HistoryView';
import HelpView from './components/HelpView';
import SetupGuideView from './components/SetupGuideView';
import DocumentationView from './components/DocumentationView';
import Toast from './components/Toast';
import { 
  getStoredSettings, 
  setStoredSettings
} from './utils/storage';

function App() {
  const [activeView, setActiveView] = useState('chat');
  const [settings, setSettings] = useState(getStoredSettings());
  
  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // User search/prompts history
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_search_history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const [prefilledQuery, setPrefilledQuery] = useState('');

  const handleAddHistoryEntry = (query) => {
    if (!query.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.query.toLowerCase() !== query.toLowerCase());
      const newEntry = {
        id: Date.now().toString(),
        query: query.trim(),
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
      };
      const updated = [newEntry, ...filtered].slice(0, 50);
      localStorage.setItem('aura_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteHistoryEntry = (id) => {
    setSearchHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('aura_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  // Inject Theme & Accent Color styles on mount and when settings change
  useEffect(() => {
    const root = document.documentElement;
    
    // 1. Theme injector
    root.classList.remove('dark', 'theme-light', 'theme-high-contrast');
    if (settings.theme === 'Deep Dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'Aura Light') {
      root.classList.add('theme-light');
    } else if (settings.theme === 'High Contrast') {
      root.classList.add('theme-high-contrast');
    }

    // 2. Accent Color injector
    const accentColors = {
      cyan: {
        color: '#00dbe9',
        rgb: '0, 219, 233',
        on: '#002022',
        container: '#006970'
      },
      purple: {
        color: '#b18cff',
        rgb: '177, 140, 255',
        on: '#23005c',
        container: '#5516be'
      },
      yellow: {
        color: '#eac324',
        rgb: '234, 195, 36',
        on: '#231b00',
        container: '#715d00'
      },
      red: {
        color: '#ff8f8f',
        rgb: '255, 143, 143',
        on: '#690005',
        container: '#93000a'
      }
    };

    const selectedAccent = accentColors[settings.accentColor] || accentColors.cyan;

    root.style.setProperty('--accent-color', selectedAccent.color);
    root.style.setProperty('--accent-color-rgb', selectedAccent.rgb);
    root.style.setProperty('--accent-color-on', selectedAccent.on);
    root.style.setProperty('--accent-color-container', selectedAccent.container);

  }, [settings.theme, settings.accentColor]);

  // Handle Save Settings
  const handleSaveChanges = (newSettings) => {
    setSettings(newSettings);
    setStoredSettings(newSettings);
  };

  // Handle Export Data
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify({ settings, exportedAt: new Date().toISOString() }, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'aura_ai_settings.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      showToast('Export file downloaded.', 'success');
    } catch (e) {
      showToast('Data compilation failed.', 'error');
    }
  };



  // Render Sub-Views
  const renderActiveView = () => {
    switch (activeView) {
      case 'chat':
        return (
          <ChatView 
            settings={settings} 
            onAddHistoryEntry={handleAddHistoryEntry}
            prefilledQuery={prefilledQuery}
            onClearPrefilledQuery={() => setPrefilledQuery('')}
          />
        );
      case 'history':
        return (
          <HistoryView 
            searchHistory={searchHistory}
            onDeleteHistoryEntry={handleDeleteHistoryEntry}
            onSelectSearch={(query) => {
              setPrefilledQuery(query);
              setActiveView('chat');
            }}
          />
        );
      case 'help':
        return <HelpView />;
      case 'setup':
        return <SetupGuideView />;
      case 'docs':
        return <DocumentationView />;
      case 'settings':
      default:
        return (
          <SettingsView
            settings={settings}
            onSettingsChange={handleSaveChanges}
            onExportData={handleExportData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Sidebar - Desktop Layout */}
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

      {/* Main Content Pane */}
      <main className="md:ml-64 h-screen max-h-screen overflow-hidden p-4 md:p-6 pb-28 md:pb-6 flex flex-col items-center select-none">
        <div className={`flex-1 w-full max-w-[1100px] min-h-0 flex flex-col items-center ${activeView !== 'chat' ? 'overflow-y-auto no-scrollbar pr-1' : ''}`}>
          {renderActiveView()}
        </div>
        
        {/* Highlights Developer Signature */}
        <footer className="w-full max-w-[1100px] mt-4 mb-2 text-center select-none flex-shrink-0">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface-container/30 border border-white/10 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] hover:border-primary-fixed-dim/20">
            <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse shadow-[0_0_8px_var(--accent-color)]"></span>
            <span className="text-[12.5px] text-on-surface-variant font-medium tracking-wide">
              Developed by <strong className="text-primary-fixed-dim font-bold">Satyajit Pratihar</strong>
            </span>
          </div>
        </footer>
      </main>

      {/* Bottom Nav - Mobile Layout */}
      <BottomNav 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

      {/* Notifications Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
