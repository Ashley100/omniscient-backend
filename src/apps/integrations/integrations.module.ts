// Package modules
import { Module } from '@nestjs/common';

// Local modules
import { BinanceController } from './binance/binance.controller';
import { BinanceService } from './binance/binance.service';

import { BybitController } from './bybit/bybit.controller';
import { ByBitService } from './bybit/bybit.service';

import { IntegrationsService } from './integrations.service';

@Module({
  controllers: [
    BinanceController,
    BybitController
  ],
  providers: [
    IntegrationsService,
    BinanceService,
    ByBitService
  ],
  exports: [
    IntegrationsService,
    BinanceService,
    ByBitService
  ]
})
export class IntegrationsModule {
  constructor() {}
}
