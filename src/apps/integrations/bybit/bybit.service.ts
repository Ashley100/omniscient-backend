// Package modules
import { Injectable } from '@nestjs/common';

// Services
import { IntegrationService } from '../integration.service';

// Local modules
import { bybitApi } from './lib/api';
import { PAIRS } from './lib/constants';
import { PLATFORMS } from '../../../lib/config/constants';

// Interfaces
import {
  OrderBookInterface,
  PlatformServiceInterface
} from '../lib/interfaces';

@Injectable()
export class ByBitService extends IntegrationService implements PlatformServiceInterface {
  readonly platform: string;
  readonly orderBookLimit: number;

  constructor() {
    super();

    this.platform = PLATFORMS.bybit;
    this.orderBookLimit = 5;
  }

  async getOrderBook(pair:string, limit:number): Promise<OrderBookInterface> {

    const orderBook = await bybitApi.getOrderBook(PAIRS[pair], limit);

    const formattedOrderBook = this.formatToGeneralOrderBook(orderBook);

    return formattedOrderBook;
  }

  formatToGeneralOrderBook(orderBook): OrderBookInterface {
    let orders: OrderBookInterface = {
      bids: [...orderBook.data.result.filter(symbol => symbol.side === 'Buy').map(symbol => ({ price: symbol.price, size: symbol.size }))],
      asks: [...orderBook.data.result.filter(symbol => symbol.side === 'Sell').map(symbol => ({ price: symbol.price, size: symbol.size }))],
    };

    return orders;
  }

}
