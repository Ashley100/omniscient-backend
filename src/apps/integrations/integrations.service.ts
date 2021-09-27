// Package modules
import { Inject, Injectable } from '@nestjs/common';

// Local modules
import { BinanceService } from './binance/binance.service';
import { ByBitService } from './bybit/bybit.service';


@Injectable()
export class IntegrationsService {
  constructor(
    private binanceService: BinanceService,
    private bybitService: ByBitService,
  ) {}

  async start() {
    const binanceOrderBook = await this.binanceService.getOrderBook();
    const bybitOrderBook = await this.bybitService.getOrderBook();

    console.log("👉", binanceOrderBook.data, "👈");
    console.log("👉", bybitOrderBook.data, "👈");
  }
}
