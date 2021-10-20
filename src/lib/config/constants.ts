export type SymbolsInterface = {
  readonly BTC: string,
  readonly USDT: string,
  readonly ETH: string,
  readonly UNI: string,
  readonly XRP: string,
}
export const SYMBOLS: SymbolsInterface = {
  BTC: 'BTC',
  USDT: 'USDT',
  ETH: 'ETH',
  UNI: 'UNI',
  XRP: 'XRP',
};

export const SYMBOLS_NAME = {
  [SYMBOLS.BTC]: 'Bitcoin',
  [SYMBOLS.USDT]: 'TetherUS',
  [SYMBOLS.ETH]: 'Ethereum',
  [SYMBOLS.UNI]: 'Uniswap',
  [SYMBOLS.XRP]: 'Ripple',
};

export type GeneralPairsInterface = {
  readonly BTCUSDT: string,
  readonly BTCETH: string,

  readonly ETHBTC: string,
  readonly ETHUSDT: string,

  readonly USDTBTC: string,
  readonly USDTETH: string,

  readonly UNIBTC: string,
  readonly UNIUSDT: string,

  readonly XRPBTC: string,
  readonly XRPUSDT: string,
}
export const GENERAL_PAIRS: GeneralPairsInterface = {
  // BTC
  BTCUSDT: `${SYMBOLS.BTC}${SYMBOLS.USDT}`,
  BTCETH: `${SYMBOLS.BTC}${SYMBOLS.ETH}`,
  // ETH
  ETHBTC: `${SYMBOLS.ETH}${SYMBOLS.BTC}`,
  ETHUSDT: `${SYMBOLS.ETH}${SYMBOLS.USDT}`,
  // USDT
  USDTBTC: `${SYMBOLS.USDT}${SYMBOLS.BTC}`,
  USDTETH: `${SYMBOLS.USDT}${SYMBOLS.ETH}`,
  // UNI
  UNIBTC: `${SYMBOLS.UNI}${SYMBOLS.BTC}`,
  UNIUSDT: `${SYMBOLS.UNI}${SYMBOLS.USDT}`,
  // XRP
  XRPBTC: `${SYMBOLS.XRP}${SYMBOLS.BTC}`,
  XRPUSDT: `${SYMBOLS.XRP}${SYMBOLS.USDT}`,
};

export type PlatformsInterface = {
  readonly binance: string,
  readonly bybit: string,
  readonly kucoin: string,
}
export const PLATFORMS: PlatformsInterface = {
  binance: 'binance',
  bybit: 'bybit',
  kucoin: 'kucoin',
}

export const TRADING_INTERVALS = {
  '1m': '1m',
  '3m': '3m',
  '5m': '5m',
  '15m': '15m',
  '30m': '30m',
  '1h': '1h',
  '2h': '2h',
  '4h': '4h',
  '6h': '6h',
  '8h': '8h',
  '12h': '12h',
  '1d': '1d',
  '3d': '3d',
  '1w': '1w',
};

export const USER = {
  budget: 100,
  budgetToTrade: 100,
  orderLimits: {
    buy: 100,
    sell: 100
  },
  pairs: [
    GENERAL_PAIRS.BTCUSDT,
    GENERAL_PAIRS.UNIUSDT,
    GENERAL_PAIRS.ETHUSDT
  ],
  platforms: [
    PLATFORMS.binance,
    PLATFORMS.kucoin,
    PLATFORMS.bybit
  ]
};
