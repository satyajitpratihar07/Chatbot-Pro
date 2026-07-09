import React from 'react';

const SettingsView = ({ 
  settings, 
  onSettingsChange, 
  onExportData
}) => {
  const getSliderLabel = (val) => {
    if (val < 33) return 'Precision Focused';
    if (val > 66) return 'Creative Burst';
    return 'Balanced';
  };

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    onSettingsChange(updated);
    // Write directly to local storage for instant persistence
    localStorage.setItem('aura_settings', JSON.stringify(updated));
  };

  return (
    <div className="max-w-[1000px] w-full space-y-xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Page Header */}
      <header className="text-left">
        <h2 className="font-headline-lg text-[32px] font-semibold mb-2">Settings</h2>
        <p className="text-on-surface-variant text-[16px] leading-relaxed">
          Configure model parameters, switch styling themes, and export logs instantly.
        </p>
      </header>

      {/* Settings Grid */}
      <div className="space-y-lg">
        {/* AI Personality Section */}
        <section className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[24px]">psychology</span>
            <h3 className="text-[20px] font-semibold text-on-surface">AI Personality</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-label-md font-medium text-[14px]">
                <span>Response Mode</span>
                <span className="text-primary-fixed-dim font-semibold" id="personality-label">
                  {getSliderLabel(settings.personality)}
                </span>
              </div>
              <input
                className="w-full cursor-pointer accent-primary"
                id="personality-slider"
                max="100"
                min="0"
                type="range"
                value={settings.personality}
                onChange={(e) => updateSetting('personality', parseInt(e.target.value, 10))}
              />
              <div className="flex justify-between text-[11px] text-on-surface-variant">
                <span>High Precision</span>
                <span>High Creativity</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-surface-container rounded-lg">
              <div>
                <h4 className="font-medium text-[14px]">Analytical Depth</h4>
                <p className="text-[11px] text-on-surface-variant">Enable detailed step-by-step reasoning</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in select-none">
                <input
                  checked={settings.analyticalDepth}
                  onChange={() => updateSetting('analyticalDepth', !settings.analyticalDepth)}
                  className="opacity-0 w-0 h-0 toggle-checkbox"
                  id="toggle-reasoning"
                  type="checkbox"
                />
                <label
                  className="toggle-label absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-variant rounded-full transition duration-300"
                  htmlFor="toggle-reasoning"
                >
                  <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300"></span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[24px]">palette</span>
            <h3 className="text-[20px] font-semibold text-on-surface">Appearance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => updateSetting('theme', 'Deep Dark')}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                settings.theme === 'Deep Dark'
                  ? 'border-primary bg-primary/5 shadow-inner'
                  : 'border-white/5 bg-surface-variant/20 hover:bg-surface-variant/40'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${settings.theme === 'Deep Dark' ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: settings.theme === 'Deep Dark' ? "'FILL' 1" : "" }}>
                dark_mode
              </span>
              <span className="text-label-md font-medium text-[14px]">Deep Dark</span>
            </button>
            
            <button
              onClick={() => updateSetting('theme', 'Aura Light')}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                settings.theme === 'Aura Light'
                  ? 'border-primary bg-primary/5 shadow-inner'
                  : 'border-white/5 bg-surface-variant/20 hover:bg-surface-variant/40'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${settings.theme === 'Aura Light' ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: settings.theme === 'Aura Light' ? "'FILL' 1" : "" }}>
                light_mode
              </span>
              <span className="text-label-md font-medium text-[14px]">Aura Light</span>
            </button>
            
            <button
              onClick={() => updateSetting('theme', 'High Contrast')}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                settings.theme === 'High Contrast'
                  ? 'border-primary bg-primary/5 shadow-inner'
                  : 'border-white/5 bg-surface-variant/20 hover:bg-surface-variant/40'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${settings.theme === 'High Contrast' ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: settings.theme === 'High Contrast' ? "'FILL' 1" : "" }}>
                contrast
              </span>
              <span className="text-label-md font-medium text-[14px]">High Contrast</span>
            </button>
          </div>

          <div className="pt-4 space-y-3">
            <label className="text-label-md font-medium text-[14px] block">Accent Color</label>
            <div className="flex gap-4">
              {/* Cyan */}
              <button
                type="button"
                onClick={() => updateSetting('accentColor', 'cyan')}
                className={`w-8 h-8 rounded-full bg-[#00dbe9] border-2 cursor-pointer transition-transform ${
                  settings.accentColor === 'cyan' ? 'border-white ring-4 ring-[#00dbe9]/20 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title="Cyan Accent"
              />
              {/* Purple */}
              <button
                type="button"
                onClick={() => updateSetting('accentColor', 'purple')}
                className={`w-8 h-8 rounded-full bg-[#d0bcff] border-2 cursor-pointer transition-transform ${
                  settings.accentColor === 'purple' ? 'border-white ring-4 ring-[#d0bcff]/20 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title="Purple Accent"
              />
              {/* Yellow */}
              <button
                type="button"
                onClick={() => updateSetting('accentColor', 'yellow')}
                className={`w-8 h-8 rounded-full bg-[#eac324] border-2 cursor-pointer transition-transform ${
                  settings.accentColor === 'yellow' ? 'border-white ring-4 ring-[#eac324]/20 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title="Gold Accent"
              />
              {/* Red */}
              <button
                type="button"
                onClick={() => updateSetting('accentColor', 'red')}
                className={`w-8 h-8 rounded-full bg-[#ffb4ab] border-2 cursor-pointer transition-transform ${
                  settings.accentColor === 'red' ? 'border-white ring-4 ring-[#ffb4ab]/20 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title="Coral Accent"
              />
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[24px]">verified_user</span>
            <h3 className="text-[20px] font-semibold text-on-surface">Data &amp; Privacy</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-surface-container rounded-lg">
              <div>
                <h4 className="font-medium text-[14px]">Chat History Persistence</h4>
                <p className="text-[11px] text-on-surface-variant">Save conversations to your account</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in select-none">
                <input
                  checked={settings.historyPersistence}
                  onChange={() => updateSetting('historyPersistence', !settings.historyPersistence)}
                  className="opacity-0 w-0 h-0 toggle-checkbox"
                  id="toggle-history"
                  type="checkbox"
                />
                <label
                  className="toggle-label absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-variant rounded-full transition duration-300"
                  htmlFor="toggle-history"
                >
                  <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300"></span>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-surface-container rounded-lg">
              <div>
                <h4 className="font-medium text-[14px]">Training Data</h4>
                <p className="text-[11px] text-on-surface-variant">Allow chats to improve Aura models</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in select-none">
                <input
                  checked={settings.trainingData}
                  onChange={() => updateSetting('trainingData', !settings.trainingData)}
                  className="opacity-0 w-0 h-0 toggle-checkbox"
                  id="toggle-training"
                  type="checkbox"
                />
                <label
                  className="toggle-label absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-variant rounded-full transition duration-300"
                  htmlFor="toggle-training"
                >
                  <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300"></span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <button
              onClick={onExportData}
              className="w-full py-3 px-4 rounded-lg bg-surface-variant/40 hover:bg-surface-variant transition-all flex items-center justify-center gap-2 text-label-md font-medium text-[14px] text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export My Data
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
