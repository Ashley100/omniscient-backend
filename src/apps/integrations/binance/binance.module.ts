// Package modules
import { Module } from '@nestjs/common';

// Local modules
import { BinanceService } from './binance.service';

@Module({
  providers: [
    BinanceService
  ]
})
export class BinanceModule {}
