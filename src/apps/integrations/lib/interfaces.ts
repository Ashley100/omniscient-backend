export interface IntegrationServiceInterface {
  /**
   * Get highest pair
   * @param {object}
   * @type OrderBookInterface
   */
  getBestBidOrderPrice(orderBook:OrderBookInterface): number;

  /**
   * Get lowest pair
   * @param {object}
   * @type OrderBookInterface
   */
  getBestAskOrderPrice(orderBook:OrderBookInterface): number;
}

export interface PlatformServiceInterface {
  readonly orderBookLimit: number;

  /**
   * Get order book
   * @param {string} BTCUSDT or etc.
   * @param {number} limit ? 10
   */
  getOrderBook(pair:string, limit:number): Promise<OrderBookInterface>;

  /**
   * Format platform order book to your general order book format
   * @param {object}
   * @type OrderBookInterface
   */
  formatToGeneralOrderBook(orderBook: any): OrderBookInterface;
}

export type OrderBookInterface = {
  bids: Array<{ price:number, size:number }>,
  asks: Array<{ price:number, size:number }>
}

/**
 * We can retrieve more than one pair from one platform.
 * [
 *  {
 *    "binance": {
 *      "BTCUSDT": {
 *        pair: "BTCUSDT",
 *        platform: "binance",
 *        orderBook: OrderBookInterface,
 *      }
 *    }
 *  }
 * ]
 */
export type OrderBooksType = Array<
  {
    [key: string]: { // platform
      [key: string]: { // pair
        pair: string,
        platform: string,
        orderBook: OrderBookInterface
      }
    }
  }
>

export type OrderType = {
  pair?: string,
  platform?: string,
  price?: number|string,
  orderType?: 'sell' | 'buy',
  size?: number,
  orderSize?: number,
}

/**
 * [
 *  {
 *    "BTCUSDT": {
 *      "buy": OrderType,
 *      "sell": OrderType,
 *      "createdAt": "2021-10-09T17:28:46+03:00"
 *    }
 *  }
 * ]
 */
export type OffersType = Array<{
  [key: string]: { // Pair
    buy: OrderType,
    sell: OrderType,
    createdAt: string
  }
}>
