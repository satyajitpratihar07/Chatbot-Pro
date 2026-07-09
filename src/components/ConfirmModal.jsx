import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low border border-white/10 animate-in zoom-in-95 duration-200 p-6 space-y-6 text-left">
        {/* Header Info */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 text-red-400">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="text-[17px] font-bold text-on-surface leading-tight">
              {title || 'Confirm Action'}
            </h3>
            <p className="text-[13px] text-on-surface-variant leading-relaxed font-sans">
              {message}
            </p>
          </div>
        </div>

        {/* Buttons Action Bar */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-on-surface-variant hover:text-on-surface transition-all text-[13px] font-semibold cursor-pointer select-none"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:scale-[1.03] active:scale-[0.97] transition-all text-[13px] font-bold shadow-lg cursor-pointer select-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
