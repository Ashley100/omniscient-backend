// Package modules
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import * as WebSocket from 'ws';

// Local modules
import { binanceApi } from './lib/api';
import { PAIRS } from './lib/constants';
import { PLATFORMS, TRADING_INTERVALS } from '../../../../lib/config/constants';
import { JOB_TYPES, WS_CONNECTIONS } from '../../../../lib/config/config';

// Services
import { ChartsService } from '../../../charts/services/charts.service';
import { StrategiesQueueProducer } from '../../../queues/jobs/strategies.producer';

// Interfaces
import {
  OrderBookInterface,
  PlatformServiceInterface
} from '../../lib/interfaces';

const WS_EVENTS = {
  CANDLE_1m: 'kline_1m'
}

@Injectable()
export class BinanceService implements PlatformServiceInterface {
  readonly platform: string;
  readonly orderBookLimit: number;
  ws: any;

  constructor(
    private chartsService: ChartsService,
    private queue: StrategiesQueueProducer
  ) {
    this.platform = PLATFORMS.binance;
    this.orderBookLimit = 5;

    this.connectWebSocket(
      PAIRS.BTCUSDT,
      WS_EVENTS.CANDLE_1m
    );
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

  async createChart(chartDto) {
    const chart = await this.chartsService.createCandle(chartDto);

    // const isQueueEmpty = await this.queue.isQueueAvailable();
    // const queueActiveCount = await this.queue.getActiveCount();

    // console.log("👉 job1 >> ", isQueueEmpty, queueActiveCount, "👈");

    // if (!isQueueEmpty) return false;

    // console.log("👉 job2 >> ", isQueueEmpty, "👈");
    await this.queue.addJob(
      JOB_TYPES.STRATEGY_CALCULATE_JOB,
      'BINANCE_SERVICE',
      {
        chart,
        chartDto
      }
    );
    // console.log("👉 createChart >> ", chart, "👈");
    return chart;
  }



  connectWebSocket(
    pair: string,
    event: string
  ) {
    this.ws = new WebSocket(`${WS_CONNECTIONS.WS_BINANCE}${pair.toLowerCase()}@${event}`);
    this.registerWebSocketEvents();
  }

  registerWebSocketEvents() {
    this.ws.on('message', (data) => {
      this.onWebSocketMessage(data);
    });
    this.ws.on('ping', this.onWebSocketPing);
    this.ws.on('pong', this.onWebSocketPong);
    this.ws.on('error', this.onWebSocketError);
  }

  onWebSocketError(error) {
    const response = JSON.parse(error.toString());
    console.log("👉 onWebSocketError >> ", response, "👈");
  }

  onWebSocketPing(ping) {
    const response = JSON.parse(ping.toString());
    // onWebSocketPing >>  1634153126564
    console.log("👉 onWebSocketPing >> ", response, "👈");
  }

  onWebSocketPong(pong) {
    const response = JSON.parse(pong.toString());
    console.log("👉 onWebSocketPong >> ", response, "👈");
  }

  async onWebSocketMessage(data) {
    const response = JSON.parse(data.toString());
    const date = format(response.E, "yyyy-MM-dd' 'HH:mm:ss");

    const dto = {
      symbol: response.s,
      interval: TRADING_INTERVALS[response.k.i],
      size: response.k.V.toString(),
      amount: response.k.Q.toString(),
      open_price: response.k.o.toString(),
      close_price: response.k.c.toString(),
      high_price: response.k.h.toString(),
      low_price: response.k.l.toString(),

      platform: PLATFORMS.binance,
      direction: null,
      opened_at: response.k.t.toString(),
      opened_at_utc: new Date(response.k.t),
      created_by: 'omniscient',
    };

    try {
      this.createChart(dto);
    } catch (e) {
      console.log("👉 error >> ", e, "👈");
    }
  }

}
