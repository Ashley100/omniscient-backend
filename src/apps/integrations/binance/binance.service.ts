// Package modules
import { Injectable } from '@nestjs/common';

// Local modules
import { binanceApi } from './lib/api';

@Injectable()
export class BinanceService {
  async getOrderBook() {

    const orderBook = await binanceApi.getOrderBook('BTCUSDT', 5);

    return orderBook;
  }
}
