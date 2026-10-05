export const CHARGE_USD = 49.99;
export const TOKEN_GRANT = 5000;
export const STARTER_BALANCE = 1500;

export const FOLDER_ADDRESSES = [
  { symbol: 'XRP', network: 'XRP Ledger', raw: 'rObzueAiEcosystemXrpAddress123', reason: 'Not a 25-35 character XRP classic address.' },
  { symbol: 'BTC', network: 'Bitcoin', raw: 'bc1qobzueaiecosystembtc123', reason: 'Not valid bech32. The payload is a label, not a witness program.' },
  { symbol: 'SHIB', network: 'Ethereum', raw: '0xObzueAiEcosystemShibEth123', reason: 'Not 40 hex characters after 0x.' },
  { symbol: 'USDT', network: 'Ethereum', raw: '0xObzueAiEcosystemUsdt123', reason: 'Not 40 hex characters after 0x.' },
  { symbol: 'LTC', network: 'Litecoin', raw: 'ltc1qobzueaiecosystemltc123', reason: 'Not valid bech32.' },
  { symbol: 'SOL', network: 'Solana', raw: 'ObzueAiEcosystemSolana123', reason: 'Not a base58 Solana public key.' },
  { symbol: 'ETH', network: 'Ethereum', raw: '0xObzueAiEcosystemEthereum123', reason: 'Not 40 hex characters after 0x.' },
];

export const DEPOSIT_ADDRESS = null;
export const CHANGE_ADDRESS = null;

export function billStatus() {
  return {
    settled: false,
    charged: 0,
    credited: 0,
    reason: 'No deposit address passed format checks, and no transaction was queried.',
  };
}
