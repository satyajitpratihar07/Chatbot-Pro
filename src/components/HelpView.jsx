import React, { useState } from 'react';

const HelpView = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      q: 'How does the Response Mode slider affect Aura AI?',
      a: 'The Response Mode slider controls the creativity and deterministic properties of the model. Slipping towards "High Precision" forces the AI to output factual, structured, and shortened logs. Sliding towards "High Creativity" allows the model to expand its vocabulary, generate poetic and flowery descriptions, and explore innovative concepts.'
    },
    {
      id: 2,
      q: 'Where are my settings stored?',
      a: 'All configuration preferences, custom accent states, and user profiles are stored locally in your browser using `localStorage`. If you clear your browser storage, the application will revert to default layouts.'
    },
    {
      id: 3,
      q: 'How does the Accent Color selector work?',
      a: 'Selecting an accent color dynamically updates the underlying CSS variables (e.g. `--accent-color`). This updates color blocks across the Sidebar, ranges, slider, and buttons in real time.'
    },
    {
      id: 4,
      q: 'Is there a limit to data exports?',
      a: 'No. The "Export My Data" action compiles your active configurations and mock histories into a structural `.json` payload that compiles instantly and downloads to your device.'
    }
  ];

  return (
    <div className="max-w-[1000px] w-full space-y-xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Header */}
      <header className="text-left">
        <h2 className="font-headline-lg text-[32px] font-semibold mb-2">Help & Support</h2>
        <p className="text-on-surface-variant text-[16px]">
          Find guides, review features, and get system support.
        </p>
      </header>

      {/* FAQs */}
      <div className="space-y-4">
        <h3 className="text-label-md font-semibold text-[18px]">Frequently Asked Questions</h3>
        
        <div className="space-y-2">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-panel rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/2 cursor-pointer transition-colors"
                >
                  <span className="font-semibold text-on-surface text-[15px]">{faq.q}</span>
                  <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-fixed-dim' : ''}`}>
                    keyboard_arrow_down
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-[13.5px] text-on-surface-variant leading-relaxed border-t border-white/5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Card */}
      <section className="glass-panel rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center md:text-left">
          <h4 className="font-semibold text-[16px] text-on-surface">Need specialized assistance?</h4>
          <p className="text-[13px] text-on-surface-variant leading-relaxed">
            Reach out to our platform support desk for direct response channels.
          </p>
        </div>
        <button
          onClick={() => alert('Support request is simulated. In a live system, this would open a ticket.')}
          className="px-6 py-3 bg-primary-fixed-dim text-on-primary rounded-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
        >
          Contact Support
        </button>
      </section>
    </div>
  );
};

export default HelpView;
