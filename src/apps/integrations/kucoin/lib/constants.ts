import {
  GENERAL_PAIRS as generalPairs,
  SYMBOLS,
  GeneralPairsInterface,
} from '../../../../lib/config/constants';

export const PAIRS: GeneralPairsInterface = {
  ...generalPairs,
  // BTC
  BTCUSDT: `${SYMBOLS.BTC}-${SYMBOLS.USDT}`,
  BTCETH: `${SYMBOLS.BTC}-${SYMBOLS.ETH}`,
  // ETH
  ETHBTC: `${SYMBOLS.ETH}-${SYMBOLS.BTC}`,
  ETHUSDT: `${SYMBOLS.ETH}-${SYMBOLS.USDT}`,
  // USDT
  USDTBTC: `${SYMBOLS.USDT}-${SYMBOLS.BTC}`,
  USDTETH: `${SYMBOLS.USDT}-${SYMBOLS.ETH}`,
  // UNI
  UNIBTC: `${SYMBOLS.UNI}-${SYMBOLS.USDT}`,
  UNIUSDT: `${SYMBOLS.UNI}-${SYMBOLS.USDT}`,
  // UNI
  XRPBTC: `${SYMBOLS.XRP}-${SYMBOLS.BTC}`,
  XRPUSDT: `${SYMBOLS.XRP}-${SYMBOLS.USDT}`,
}
