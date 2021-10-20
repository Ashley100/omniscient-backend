// Package modules
import { Module } from '@nestjs/common';
import { QueuesModule } from '../../../queues/queues.module';

// Controllers
import { BinanceController } from './binance.controller';

// Local modules
import { BinanceService } from './binance.service';

// Modules
import { ChartsModule } from '../../../charts/charts.module';

@Module({
  imports: [
    ChartsModule,
    QueuesModule
  ],
  providers: [
    BinanceService
  ],
  controllers: [
    BinanceController
  ],
  exports: [
    BinanceService
  ],
})
export class BinanceModule {}
