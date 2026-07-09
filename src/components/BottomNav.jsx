import React from 'react';

const BottomNav = ({ activeView, onViewChange }) => {
  const mobileNavItems = [
    { id: 'chat', label: 'Chat', icon: 'chat_bubble' },
    { id: 'history', label: 'History', icon: 'forum' },
    { id: 'settings', label: 'Settings', icon: 'settings_accessibility' },
    { id: 'setup', label: 'Setup', icon: 'construction' },
    { id: 'docs', label: 'Docs', icon: 'menu_book' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface-container-highest/90 backdrop-blur-2xl border-t border-white/10 shadow-lg">
      {mobileNavItems.map((item) => {
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center justify-center p-2 transition-all duration-200 cursor-pointer ${
              isActive
                ? 'text-primary-fixed-dim bg-primary/10 rounded-xl translate-y-[-2px]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="font-label-sm text-[11px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
