import React, { useMemo, useState } from 'react';
import { FlaskConical, X } from 'lucide-react';

const ASSETS = ['XRP', 'BTC', 'SHIB', 'USDT', 'LTC', 'SOL', 'ETH'];

export const CHARGE_USD = 49.99;
export const TOKEN_GRANT = 5000;

export default function CryptoPaymentModal({ tokenPackage, balance, onClose, onReview }) {
  const [selected, setSelected] = useState(ASSETS[0]);
  const charge = Number(tokenPackage?.priceUSD || CHARGE_USD);
  const grant = Number(tokenPackage?.tokens || TOKEN_GRANT);
  const unit = useMemo(() => (grant > 0 ? charge / grant : 0), [charge, grant]);

  const review = (event) => {
    event.preventDefault();
    onReview({
      asset: selected,
      charge,
      grant,
      credited: 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-amber-400/40 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-xl font-bold text-amber-300">
            <FlaskConical className="h-5 w-5" /> Charge review
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-100">
          No deposit address was in the Gemini share or this repository. Sending funds is disabled.
          The counter does not increase until a real address is configured and a payment is actually checked.
        </p>

        <dl className="mb-4 space-y-2 rounded-lg border border-slate-700/50 bg-slate-800/60 p-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-slate-400">Package</dt>
            <dd className="font-bold text-white">{tokenPackage?.name || '5,000 demo tokens'}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-slate-400">Charge</dt>
            <dd className="font-mono text-cyan-300">{charge.toFixed(2)} USD</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-slate-400">Unit</dt>
            <dd className="font-mono text-slate-200">{unit.toFixed(6)} USD</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-slate-400">Would grant</dt>
            <dd className="font-mono text-slate-200">{grant.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-slate-400">Counter now</dt>
            <dd className="font-mono text-slate-200">{Number(balance).toLocaleString()}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-slate-400">Counter after</dt>
            <dd className="font-mono text-slate-200">{Number(balance).toLocaleString()}</dd>
          </div>
        </dl>

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

        <div className="mb-4 space-y-2 rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs">
          <p className="text-slate-400">Deposit address for {selected}</p>
          <p className="break-all font-mono text-amber-200">not configured — do not send</p>
          <p className="text-slate-400">Change address</p>
          <p className="break-all font-mono text-amber-200">not used — this page is not a wallet</p>
          <p className="text-slate-500">Amount due stays {charge.toFixed(2)} USD. No coin rate is locked.</p>
        </div>

        <form onSubmit={review}>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-100 py-3 text-sm font-bold text-slate-950 hover:bg-white"
          >
            Record charge without crediting {selected}
          </button>
        </form>
      </div>
    </div>
  );
}
