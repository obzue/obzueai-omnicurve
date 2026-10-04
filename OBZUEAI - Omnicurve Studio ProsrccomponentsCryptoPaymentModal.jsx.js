import React, { useState } from 'react';
import { Wallet, Copy, Check, ArrowRight, ShieldCheck, X } from 'lucide-react';

const SUPPORTED_ASSETS = [
  { symbol: 'XRP', name: 'XRP (Ripple)', network: 'XRP Ledger', address: 'rObzueAiEcosystemXrpAddress123' },
  { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin Mainnet', address: 'bc1qobzueaiecosystembtc123' },
  { symbol: 'SHIB', name: 'Shiba Inu', network: 'ERC-20 (Ethereum)', address: '0xObzueAiEcosystemShibEth123' },
  { symbol: 'USDT', name: 'Tether USD', network: 'ERC-20 / TRC-20', address: '0xObzueAiEcosystemUsdt123' },
  { symbol: 'LTC', name: 'Litecoin', network: 'Litecoin Mainnet', address: 'ltc1qobzueaiecosystemltc123' },
  { symbol: 'SOL', name: 'Solana', network: 'Solana Mainnet', address: 'ObzueAiEcosystemSolana123' },
  { symbol: 'ETH', name: 'Ethereum', network: 'ERC-20 Mainnet', address: '0xObzueAiEcosystemEthereum123' }
];

export default function CryptoPaymentModal({ tokenPackage, onClose, onPaymentSuccess }) {
  const [selectedAsset, setSelectedAsset] = useState(SUPPORTED_ASSETS[0]);
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedAsset.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!txHash.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess({ asset: selectedAsset.symbol, txHash, tokens: tokenPackage.tokens });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Wallet className="w-5 h-5" /> OBZUEAI Crypto Checkout
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-800/60 p-3 rounded-lg mb-4 text-sm border border-slate-700/50">
          <p className="text-slate-400 text-xs">Selected Package:</p>
          <p className="text-white font-bold text-base">{tokenPackage?.name || '1,000 OBZUEAI Tokens'} (${tokenPackage?.priceUSD || '49.99'} USD)</p>
        </div>

        <label className="block text-xs font-semibold text-slate-400 mb-2">SELECT CRYPTOCURRENCY ASSET</label>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {SUPPORTED_ASSETS.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => setSelectedAsset(asset)}
              className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                selectedAsset.symbol === asset.symbol
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {asset.symbol}
            </button>
          ))}
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4 text-xs">
          <p className="text-slate-400 mb-1">Send payment on {selectedAsset.network}:</p>
          <div className="flex items-center justify-between gap-2 bg-slate-900 p-2 rounded border border-slate-800 font-mono text-cyan-400 break-all">
            <span>{selectedAsset.address}</span>
            <button onClick={handleCopy} className="p-1 hover:text-white shrink-0">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-3">
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Paste TxID / Transaction Hash..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
          >
            {isVerifying ? 'Verifying On-Chain Tx...' : 'Verify Payment & Claim Tokens'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}