// Package modules
import { Injectable } from '@nestjs/common';

// Interfaces
import {
  IntegrationServiceInterface,
  OrderBookInterface,
} from './lib/interfaces';

type orderInfo = {
  price: string|number,
  size: string|number
}

@Injectable()
export class IntegrationService implements IntegrationServiceInterface {

  getBestAskOrderPrice(orderBook:OrderBookInterface): number {
    const bestOrderPrice = orderBook.asks.map(symbol => symbol.price).reduce((a, b) => Math.min(a, b));

    return bestOrderPrice;
  }

  getBestBidOrderPrice(orderBook:OrderBookInterface): number {
    const bestOrderPrice = orderBook.bids.map(symbol => symbol.price).reduce((a, b) => Math.max(a, b));

    return bestOrderPrice;
  }

  getBestAskOrderInfo(orderBook:OrderBookInterface): orderInfo {
    const { price, size } = orderBook.asks.reduce((prevOrder:any, currentOrder) => {
      if (typeof prevOrder.price === 'undefined') {
        return { ...currentOrder };
      } else {
        if (prevOrder.price > currentOrder.price) {
          return { ...currentOrder };
        }
      }
      return prevOrder
    }, {});

    return {
      price,
      size
    };
  }

  getBestBidOrderInfo(orderBook:OrderBookInterface): orderInfo {
    const { price, size } = orderBook.asks.reduce((prevOrder:any, currentOrder) => {
      if (typeof prevOrder.price === 'undefined') {
        return { ...currentOrder };
      } else {
        if (prevOrder.price < currentOrder.price) {
          return { ...currentOrder };
        }
      }
      return prevOrder
    }, {});

    return {
      price,
      size
    };
  }

}
