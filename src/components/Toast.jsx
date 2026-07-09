import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning'
  };

  const colors = {
    success: 'text-primary-fixed-dim border-primary/20',
    error: 'text-error border-error/20',
    info: 'text-secondary-fixed border-secondary/20',
    warning: 'text-tertiary-fixed border-tertiary/20'
  };

  return (
    <div className={`fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center gap-3 py-3 px-5 rounded-xl glass-panel shadow-2xl animate-in slide-in-from-bottom duration-300 border ${colors[type]}`}>
      <span className="material-symbols-outlined text-[20px] fill-current animate-pulse">
        {icons[type]}
      </span>
      <p className="text-on-surface text-label-md text-[14px] font-medium leading-none">
        {message}
      </p>
      <button 
        onClick={onClose} 
        className="ml-2 text-on-surface-variant hover:text-on-surface hover:scale-115 transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};

export default Toast;
