import React, { useCallback, useEffect, useState } from 'react';
import ChatPrompt from './components/ChatPrompt';
import CryptoPaymentModal from './components/CryptoPaymentModal';
import LobbyPreview from './components/LobbyPreview';
import UserProfile from './components/UserProfile';
import { Cpu, Sparkles, Wallet } from 'lucide-react';

const TOKEN_KEY = 'obzueai-omnicurve-demo-tokens';

export default function App() {
  const [showDemo, setShowDemo] = useState(false);
  const [tokens, setTokens] = useState(1500);
  const [profileName, setProfileName] = useState('Guest');
  const [status, setStatus] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: 'ObzueAI Omnicurve is open in this tab. Prompts are echoed here. Nothing is compiled or sent to a chain.',
    },
  ]);

  useEffect(() => {
    const saved = window.localStorage.getItem(TOKEN_KEY);
    if (saved && Number.isFinite(Number(saved))) setTokens(Number(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(TOKEN_KEY, String(tokens));
  }, [tokens]);

  const onNameChange = useCallback((name) => setProfileName(name), []);

  const handleSendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      {
        role: 'agent',
        text: `Saved in this tab for ${profileName}: "${text}". No agent left the page.`,
      },
    ]);
  };

  const handleDemoClaim = (data) => {
    setTokens((prev) => prev + data.tokens);
    setStatus(`Demo counter increased by ${data.tokens}. No ${data.asset} payment occurred.`);
    setShowDemo(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400 bg-cyan-500/10 font-bold text-cyan-400">
            O
          </div>
          <span className="text-lg font-extrabold tracking-wider text-white">
            ObzueAI <span className="text-cyan-400">OMNICURVE</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-cyan-300">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>{tokens.toLocaleString()} DEMO</span>
          </div>
          <button
            onClick={() => setShowDemo(true)}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500"
          >
            <Wallet className="h-4 w-4" /> Demo counter
          </button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 p-6 md:grid-cols-3">
        <section className="flex h-[650px] flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl md:col-span-2">
          <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <Sparkles className="h-4 w-4 text-cyan-400" /> Prompt terminal
            </h2>
            <span className="font-mono text-xs text-green-400">this tab only</span>
          </div>
          <div className="mb-4 flex-1 space-y-3 overflow-y-auto pr-2">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={`max-w-[80%] rounded-xl p-3 text-xs ${
                  msg.role === 'user'
                    ? 'ml-auto border border-cyan-500/30 bg-cyan-600/20 text-cyan-200'
                    : 'border border-slate-700/50 bg-slate-800/80 text-slate-300'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <ChatPrompt onSendMessage={handleSendMessage} />
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl">
            <h3 className="mb-3 text-xs font-bold text-slate-400">Lobby preview</h3>
            <LobbyPreview />
            <p className="mt-2 text-xs text-slate-500">Canvas sketch. Not a multiplayer city.</p>
          </div>
          <UserProfile onNameChange={onNameChange} />
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400 shadow-xl">
            <p>Plaza and marketplace counts are not live.</p>
            {status ? <p className="mt-2 text-amber-200">{status}</p> : null}
          </div>
        </section>
      </main>

      {showDemo ? (
        <CryptoPaymentModal
          tokenPackage={{ name: '5,000 demo tokens', priceUSD: '49.99', tokens: 5000 }}
          onClose={() => setShowDemo(false)}
          onDemoClaim={handleDemoClaim}
        />
      ) : null}
    </div>
  );
}
