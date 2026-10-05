import React, { useState } from 'react';
import { FlaskConical, X } from 'lucide-react';

const ASSETS = ['XRP', 'BTC', 'SHIB', 'USDT', 'LTC', 'SOL', 'ETH'];

export default function CryptoPaymentModal({ tokenPackage, onClose, onDemoClaim }) {
  const [selected, setSelected] = useState(ASSETS[0]);
  const [note, setNote] = useState('');

  const claim = (event) => {
    event.preventDefault();
    setNote(`Demo only. No ${selected} transfer was sent or checked.`);
    onDemoClaim({ asset: selected, tokens: tokenPackage.tokens });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-amber-400/40 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-xl font-bold text-amber-300">
            <FlaskConical className="h-5 w-5" /> Demo token counter
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-100">
          This is not a checkout. There is no deposit address, no chain query, and no payment verification.
          Claiming adds a local counter in this browser only.
        </p>

        <div className="mb-4 rounded-lg border border-slate-700/50 bg-slate-800/60 p-3 text-sm">
          <p className="text-xs text-slate-400">Package label</p>
          <p className="text-base font-bold text-white">
            {tokenPackage?.name || 'Demo tokens'} · shown price {tokenPackage?.priceUSD || '0.00'} USD
          </p>
        </div>

        <p className="mb-2 text-xs font-semibold text-slate-400">ASSET LABEL</p>
        <div className="mb-4 grid grid-cols-4 gap-2">
          {ASSETS.map((asset) => (
            <button
              key={asset}
              type="button"
              onClick={() => setSelected(asset)}
              className={`rounded-lg border p-2 text-xs font-bold ${
                selected === asset
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
            >
              {asset}
            </button>
          ))}
        </div>

        <form onSubmit={claim} className="space-y-3">
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-100 py-3 text-sm font-bold text-slate-950 hover:bg-white"
          >
            Add demo tokens for {selected}
          </button>
          {note ? <p className="text-xs text-slate-300">{note}</p> : null}
        </form>
      </div>
    </div>
  );
}
