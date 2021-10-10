// Package modules
import { Injectable } from '@nestjs/common';
import { formatISO } from "date-fns";
import { map, set } from 'lodash';

// Services
import { BinanceService } from './binance/binance.service';
import { ByBitService } from './bybit/bybit.service';
import { KucoinService } from './kucoin/kucoin.service';

// Interfaces
import {
  IntegrationServiceInterface,
  OrderBookInterface,
  OffersType,
  OrderBooksType
} from './lib/interfaces';

type orderInfo = {
  price: string|number,
  size: string|number
}

@Injectable()
export class IntegrationService implements IntegrationServiceInterface {
  private readonly services: Object;

  constructor(
    private binanceService: BinanceService,
    private bybitService: ByBitService,
    private kucoinService: KucoinService
  ) {
    this.services = {
      [binanceService.platform]: binanceService,
      [bybitService.platform]: bybitService,
      [kucoinService.platform]: kucoinService,
    };
  }

  getBestAskOrderPrice(orderBook:OrderBookInterface): number {
    const bestOrderPrice = orderBook.asks.map(symbol => symbol.price).reduce((a, b) => Math.min(a, b));

    return bestOrderPrice;
  }

  getBestBidOrderPrice(orderBook:OrderBookInterface): number {
    const bestOrderPrice = orderBook.bids.map(symbol => symbol.price).reduce((a, b) => Math.max(a, b));

    return bestOrderPrice;
  }

  private getPlatformService(platform: string) {
    return this.services[platform];
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

  /**
   * Get order books from selected platforms
   * @param pairs
   * @param platforms
   */
  async getAllOrderBooks(
    pairs: Array<string>,
    platforms: Array<string>
  ): Promise<OrderBooksType> {

    const orderBooks = await Promise.all(
      platforms.map(async platform => {

        const result: any = {};

        const service = this.getPlatformService(platform);

        for (let index = 0; index <= pairs.length - 1 ; index++) {
          const pair = pairs[index];
          const orderBook = await service.getOrderBook(pair, 5);

          set(result, `${platform}.${pair}`, {
            pair: pair,
            platform: platform,
            orderBook: orderBook,
          });
        }

        return result;
      })
    );

    return orderBooks;
  }

  /**
   * Format and combine all orderBooks to one array with the best offers to buy or sell.
   * @param {array: OrderBooksType} orderBooks
   * @return {array: OffersType}
   */
  getBestOffers(
    orderBooks:OrderBooksType
  ): OffersType {
    const results = {};

    orderBooks.forEach((book) => {
      // посмотреть на get и lodash мб поможет уменьшить кол-во циклов
      map(book, (orders) => {
        map(orders, (order) => {
          const bestAsk = this.getBestAskOrderInfo(order.orderBook);
          const bestBid =this.getBestBidOrderInfo(order.orderBook);

          return set(results, `${order.pair}.${order.platform}`, {
            bestAskPrice: bestAsk.price,
            bestAskSize: bestAsk.size,
            bestBidPrice: bestBid.price,
            bestBidSize: bestBid.size
          });
        });
      });
    });

    const bestOffers = map(results, (orders, pair) => {
      let [min, max] = [
        {
          pair,
          platform: null,
          price: Infinity,
          orderSize: null
        },
        {
          pair,
          platform: null,
          price: -Infinity,
          orderSize: null
        }
      ];

      map(orders, (prices:any, platform) => {
        if (min.price > prices.bestAskPrice) {
          min = {
            pair,
            platform,
            price: prices.bestAskPrice,
            orderSize: prices.bestAskSize
          };
        }
        if (max.price < prices.bestBidPrice) {
          max = {
            pair,
            platform,
            price: prices.bestBidPrice,
            orderSize: prices.bestBidSize
          };
        }
      });

      return {
        [pair]: {
          buy: min,
          sell: max,
          createdAt: formatISO(new Date())
        }
      }
    });

    return bestOffers;
  }

}
