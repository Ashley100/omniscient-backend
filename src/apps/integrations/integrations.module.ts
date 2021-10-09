// Package modules
import { Module } from '@nestjs/common';

// Controllers
import { BinanceController } from './binance/binance.controller';
import { BybitController } from './bybit/bybit.controller';
import { KucoinController } from './kucoin/kucoin.controller';
import { IntegrationsController } from './integrations.controller';

// Services
import { IntegrationsService } from './integrations.service';
import { IntegrationService } from './integration.service';
import { BinanceService } from './binance/binance.service';
import { ByBitService } from './bybit/bybit.service';
import { KucoinService } from './kucoin/kucoin.service';

@Module({
  controllers: [
    IntegrationsController,
    BinanceController,
    BybitController,
    KucoinController
  ],
  providers: [
    IntegrationsService,
    IntegrationService,
    BinanceService,
    ByBitService,
    KucoinService
  ],
  exports: [
    IntegrationsService,
    IntegrationService,
    BinanceService,
    ByBitService,
    KucoinService
  ]
})
export class IntegrationsModule {
  constructor() {}
}
