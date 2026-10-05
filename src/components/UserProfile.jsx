import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'obzueai-omnicurve-profile';

export default function UserProfile({ onNameChange }) {
  const [name, setName] = useState('Guest');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setName(saved);
      onNameChange(saved);
    }
  }, [onNameChange]);

  const save = (event) => {
    event.preventDefault();
    const next = name.trim() || 'Guest';
    setName(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    onNameChange(next);
  };

  return (
    <form onSubmit={save} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl">
      <h3 className="text-xs font-bold text-slate-400">Profile in this browser</h3>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
        aria-label="Display name"
      />
      <button type="submit" className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-cyan-300">
        Save name
      </button>
      <p className="text-xs text-slate-500">
        No background agent is running. Prompts stay in this tab.
      </p>
    </form>
  );
}
