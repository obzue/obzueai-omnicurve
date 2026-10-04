import React, { useState } from 'react';
import ChatPrompt from './components/ChatPrompt';
import CryptoPaymentModal from './components/CryptoPaymentModal';
import { Wallet, Sparkles, Cpu, Globe, Users, ShoppingBag } from 'lucide-react';

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [tokens, setTokens] = useState(1500);
  const [messages, setMessages] = useState([
    { role: 'agent', text: 'Welcome to OBZUEAI Omnicurve Studio Pro! Use voice or text to build the future.' }
  ]);

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: `Received prompt: "${text}". Processing across autonomous engine pipeline...` }
      ]);
    }, 1000);
  };

  const handlePaymentSuccess = (data) => {
    setTokens((prev) => prev + data.tokens);
    setShowCheckout(false);
    alert(`Payment Verified! Added ${data.tokens} OBZUEAI tokens to your balance.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Navigation Topbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 font-bold">
            O
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white">OBZUEAI <span className="text-cyan-400">OMNICURVE</span></span>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-cyan-300">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{tokens.toLocaleString()} TOKENS</span>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
          >
            <Wallet className="w-4 h-4" /> Buy Tokens
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: AI Agent Chat & Vibe Coding */}
        <section className="md:col-span-2 flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl h-[650px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Omni-Agent Vibe Coding Terminal
            </h2>
            <span className="text-xs text-green-400 font-mono">● ONLINE</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-200 ml-auto'
                    : 'bg-slate-800/80 border border-slate-700/50 text-slate-300'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <ChatPrompt onSendMessage={handleSendMessage} />
        </section>

        {/* Right Column: 3D City & Ecosystem Controls */}
        <section className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> 3D Open Lobby & City
            </h3>
            <div className="h-40 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-slate-600 text-xs font-mono">
              [3D WebGL World Canvas]
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" /> Community Spaces
            </h3>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span>Plaza Social Lounge</span>
                <span className="text-cyan-400 font-bold">24 Active</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span>Developer Marketplace</span>
                <span className="text-cyan-400 font-bold">12 Stores</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Crypto Checkout Modal */}
      {showCheckout && (
        <CryptoPaymentModal
          tokenPackage={{ name: '5,000 OBZUEAI Tokens', priceUSD: '49.99', tokens: 5000 }}
          onClose={() => setShowCheckout(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}