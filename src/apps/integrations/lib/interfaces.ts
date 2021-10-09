export interface IntegrationServiceInterface {
  /**
   * Get highest pair
   * @param pair
   */
  getBestBidOrderPrice(orderBook:OrderBookInterface): number;
  /**
   * Get lowest pair
   * @param pair
   */
  getBestAskOrderPrice(orderBook:OrderBookInterface): number;
}

export interface PlatformServiceInterface {
  readonly orderBookLimit: number;

  /**
   * Get order book
   * @param pair
   * @param limit
   */
  getOrderBook(pair:string, limit:number): Promise<OrderBookInterface>;
  /**
   * Format platform order book to your general order book format
   * @param orderBook
   */
  formatToGeneralOrderBook(orderBook: any): OrderBookInterface;
}

export type OrderBookInterface = {
  bids: Array<{ price:number, size:number }>,
  asks: Array<{ price:number, size:number }>
}

export type OrderBooksType = Array<
  {
    [key: string]: {
      pair: string,
      platform: string,
      orderBook: OrderBookInterface
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

export type OffersType = Array<{
  [key: string]: {
    buy: OrderType,
    sell: OrderType
  }
}>
