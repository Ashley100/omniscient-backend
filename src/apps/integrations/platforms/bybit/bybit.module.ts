// Package modules
import { Module } from '@nestjs/common';

// Controllers
import { BybitController } from './bybit.controller';

// Services
import { ByBitService } from './bybit.service';

@Module({
  controllers: [
    BybitController
  ],
  providers: [
    ByBitService
  ],
  exports: [
    ByBitService
  ]
})
export class BybitModule {}
