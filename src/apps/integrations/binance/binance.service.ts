// Package modules
import { Injectable } from '@nestjs/common';

// Local modules
import { binanceApi } from './lib/api';
import { PAIRS } from './lib/constants';
import { PLATFORMS } from '../../../lib/config/constants';

// Interfaces
import {
  OrderBookInterface,
  PlatformServiceInterface
} from '../lib/interfaces';


@Injectable()
export class BinanceService implements PlatformServiceInterface {
  readonly platform: string;
  readonly orderBookLimit: number;

  constructor() {
    this.platform = PLATFORMS.binance;
    this.orderBookLimit = 5;
  }


  async getOrderBook(pair:string, limit:number): Promise<OrderBookInterface> {

    const orderBook = await binanceApi.getOrderBook(PAIRS[pair], limit);

    const formattedOrderBook = this.formatToGeneralOrderBook(orderBook);

    return formattedOrderBook;
  }


  formatToGeneralOrderBook(orderBook) {
    let orders: OrderBookInterface = {
      bids: [...orderBook.data.bids.map(symbol => ({ price: symbol[0], size: symbol[1] }))],
      asks: [...orderBook.data.asks.map(symbol => ({ price: symbol[0], size: symbol[1] }))],
    };

    return orders;
  }

}
