// Package modules
import { Injectable } from '@nestjs/common';

// Local modules
import { bybitApi } from './lib/api';

@Injectable()
export class ByBitService {
  async getOrderBook() {

    const orderBook = await bybitApi.getOrderBook('BTCUSDT', 5);

    return orderBook;
  }
}
