import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const HistoryView = ({ searchHistory = [], onDeleteHistoryEntry, onSelectSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const filteredHistory = searchHistory.filter(item => 
    item.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearAll = () => {
    setIsConfirmOpen(true);
  };

  const executeClearAll = () => {
    setIsConfirmOpen(false);
    localStorage.removeItem('aura_search_history');
    window.location.reload();
  };

  return (
    <div className="max-w-[1000px] w-full space-y-xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Header */}
      <header className="text-left flex justify-between items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[32px] font-semibold mb-2">History</h2>
          <p className="text-on-surface-variant text-[16px]">
            Review, re-run, or clear your past search prompts.
          </p>
        </div>
        {searchHistory.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-error-container/10 border border-error/20 text-error hover:bg-error-container/20 transition-all text-[12.5px] font-medium cursor-pointer select-none"
          >
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
            <span>Clear All</span>
          </button>
        )}
      </header>

      {/* Control Bar */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant text-[20px]">search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your recent prompts..."
          className="w-full pl-10 pr-4 py-3 bg-surface-container border border-white/10 rounded-xl text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors text-[14px]"
        />
      </div>

      {/* History List */}
      <div className="space-y-3">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-xl flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 overflow-hidden flex-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">
                    chat_bubble
                  </span>
                  <h3 className="font-semibold text-on-surface text-[15px] truncate">
                    {item.query}
                  </h3>
                </div>
                <span className="text-[11px] text-on-surface-variant/60 block font-mono pl-6">
                  {item.date}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel p-12 text-center rounded-xl space-y-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[48px] opacity-40">
              history_toggle_off
            </span>
            <p className="text-on-surface-variant text-body-md font-medium">
              No recent prompts found.
            </p>
            <p className="text-on-surface-variant/60 text-label-sm">
              {searchHistory.length > 0 
                ? "Try searching for a different phrase." 
                : "Start typing messages in the Chat tab to build your search history."
              }</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Clear Search History"
        message="Are you sure you want to clear your entire search history? This action cannot be undone."
        onConfirm={executeClearAll}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default HistoryView;
