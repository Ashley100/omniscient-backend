// Package modules
import { Injectable } from '@nestjs/common';
import { map, set } from 'lodash';
import { USER } from '../../lib/config/constants';

// Local modules
import { IntegrationService } from './integration.service';
import { BinanceService } from './binance/binance.service';
import { ByBitService } from './bybit/bybit.service';
import { KucoinService } from './kucoin/kucoin.service';

// Interfaces
import { OffersType, OrderBooksType } from './lib/interfaces';


@Injectable()
export class IntegrationsService {
  private readonly services: Object;

  constructor(
    private integrationService: IntegrationService,
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

  private getPlatformService(
    platform: string
  ) {
    return this.services[platform];
  }

  async start(
    pairs: Array<string>,
    platforms: Array<string>
  ) {

    const orderBooks = await this.getAllOrderBooks(pairs, platforms);

    return this.getBestOffers(orderBooks);
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
   *
   * @param orderBooks
   */
  getBestOffers(
    orderBooks
  ): OffersType {

    // console.log("👉", orderBooks, "👈");

    const results = {};

    orderBooks.forEach((book) => {
      map(book, (orders) => {
        map(orders, (order) => {
          const bestAsk = this.integrationService.getBestAskOrderInfo(order.orderBook);
          const bestBid =this.integrationService.getBestBidOrderInfo(order.orderBook);

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

      const buyResult = USER.budgetToTrade / min.price;
      const sellResult = USER.budgetToTrade / max.price;

      return {
        [pair]: {
          buy: min,
          sell: max,
          orderResults: {
            $budgetToTrade: USER.budgetToTrade,
            buyResult,
            sellResult,
            $profit: buyResult - sellResult
          }
        }
      }
    });

    console.log("👉", bestOffers, "👈");

    return bestOffers;
  }

}
