import React from 'react';

const Sidebar = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'chat', label: 'Chat', icon: 'chat' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'setup', label: 'Setup Guide', icon: 'construction' },
    { id: 'docs', label: 'Documentation', icon: 'menu_book' }
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 hidden md:flex flex-col border-r border-white/10 bg-surface-container-low backdrop-blur-xl transition-all duration-300" id="side-nav">
      <div className="p-6 flex flex-col gap-8 h-full">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-fixed-dim rounded-lg flex items-center justify-center transition-colors duration-300">
            <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <div>
            <h1 className="font-headline-md text-[20px] font-bold text-on-surface">Aura AI</h1>
            <p className="font-label-sm text-[11px] text-on-surface-variant opacity-70">Premium Assistant</p>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-bold scale-[0.98]'
                    : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                <span className="font-body-md text-[15px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Nav */}
        <div className="pt-6 border-t border-white/5 space-y-2">
          <button
            onClick={() => onViewChange('help')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
              activeView === 'help'
                ? 'bg-secondary-container text-on-secondary-container font-bold scale-[0.98]'
                : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-body-md text-[15px]">Help</span>
          </button>
          



        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
