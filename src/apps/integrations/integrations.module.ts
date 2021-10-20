// Package modules
import { Module } from '@nestjs/common';

// Modules
import { BinanceModule } from './platforms/binance/binance.module';
import { BybitModule } from './platforms/bybit/bybit.module';
import { KucoinModule } from './platforms/kucoin/kucoin.module';

// Controllers
import { IntegrationsController } from './integrations.controller';

// Services
import { IntegrationsService } from './integrations.service';
import { IntegrationService } from './integration.service';

@Module({
  imports: [
    BinanceModule,
    BybitModule,
    KucoinModule
  ],
  controllers: [
    IntegrationsController
  ],
  providers: [
    IntegrationsService,
    IntegrationService
  ],
  exports: [
    IntegrationsService,
    IntegrationService
  ]
})
export class IntegrationsModule {
  constructor() {}
}
