const DEFAULT_SETTINGS = {
  personality: 50,
  analyticalDepth: true,
  theme: 'Deep Dark',
  accentColor: 'cyan',
  historyPersistence: true,
  trainingData: false,
  groqApiKey: ''
};

const DEFAULT_PROFILE = {
  name: 'Alex Rivera',
  email: 'alex.rivera@aura.ai',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWn_NROFTydOwNm7yrhRItqqO1s4S-VgfXxYtMPL1oHO0KXZ97zFkw6n2HpKYRVN5dUBvpBfTQEBQZNQQJVlwh41tjlMT8vgKocW2fWjY4CmIRB_3OL9Gq6adymGC-a4Qtx918VWLr5GXEDMlL-zeU8CqRG1zRZQD6EA0AZyOxZS0l72m4RO0eZui3P3L9EjiaYsiutw4HTPcHhK2WWC1-6nBf_0CxxDcOb1LZaYGy6pD0_5vC_OKxNx9pzOyyXT1EfJ_sZx2aHvdM',
  plan: 'Pro Edition'
};

export const getStoredSettings = () => {
  try {
    const stored = localStorage.getItem('aura_settings');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

export const setStoredSettings = (settings) => {
  try {
    localStorage.setItem('aura_settings', JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
};

export const getStoredProfile = () => {
  try {
    const stored = localStorage.getItem('aura_profile');
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
  } catch (e) {
    return DEFAULT_PROFILE;
  }
};

export const setStoredProfile = (profile) => {
  try {
    localStorage.setItem('aura_profile', JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to localStorage', e);
  }
};
