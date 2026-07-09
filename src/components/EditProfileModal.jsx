import React, { useState } from 'react';

const EditProfileModal = ({ profile, onSave, onClose }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  const avatars = [
    {
      id: 'alex',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOoirGkS3pr_cqINM1RGq7EoKvX65q6_ev2HQzGcV9xV1pA2rdgyPsqHawBKAkjWeSqXzip7NszN23TFsTfjDyRdkFikHj7f0v_lXBv1Os5AamDEOk1ZDM4UqFBmSdE_AcD7azcE9sum1ay-xoc0LXdUE6SgsToLQkRqUvGUX8zFfYdcfpcTDHWbIat8DPctA7gsdDw_3IqKTDV4lC3I08wuoCulgKnhdLfBOjq45T3DQN977BAp9Gn528ebJhFYrfUzlKkX1zvyuE',
      label: 'Warm Corporate (Alex)'
    },
    {
      id: 'sophia',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWn_NROFTydOwNm7yrhRItqqO1s4S-VgfXxYtMPL1oHO0KXZ97zFkw6n2HpKYRVN5dUBvpBfTQEBQZNQQJVlwh41tjlMT8vgKocW2fWjY4CmIRB_3OL9Gq6adymGC-a4Qtx918VWLr5GXEDMlL-zeU8CqRG1zRZQD6EA0AZyOxZS0l72m4RO0eZui3P3L9EjiaYsiutw4HTPcHhK2WWC1-6nBf_0CxxDcOb1LZaYGy6pD0_5vC_OKxNx9pzOyyXT1EfJ_sZx2aHvdM',
      label: 'Modern Tech Workspace'
    },
    {
      id: 'minimalist',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      label: 'Studio Portrait (Aura)'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSave({ ...profile, name, email, avatar });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-[480px] glass-panel rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-[20px] font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed-dim">edit_square</span>
            Edit Profile
          </h3>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface hover:bg-white/5 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Avatar Picker */}
          <div className="space-y-2">
            <label className="block text-label-md font-label-md">Select Profile Avatar</label>
            <div className="flex gap-4 items-center">
              {avatars.map((av) => {
                const isSelected = avatar === av.url;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatar(av.url)}
                    className={`relative rounded-full p-0.5 border-2 transition-all cursor-pointer overflow-hidden w-14 h-14 ${
                      isSelected ? 'border-primary scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={av.url} 
                      alt={av.label} 
                      className="w-full h-full rounded-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute inset-0 bg-primary/20 flex items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check
                        </span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name-input" className="block text-label-md font-label-md">Full Name</label>
            <input
              id="name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container border border-white/10 text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors"
              placeholder="e.g. Alex Rivera"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email-input" className="block text-label-md font-label-md">Email Address</label>
            <input
              id="email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container border border-white/10 text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors"
              placeholder="e.g. alex.rivera@aura.ai"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-surface-variant hover:bg-surface-bright rounded-lg font-label-md text-label-md text-on-surface hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-fixed-dim text-on-primary rounded-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
