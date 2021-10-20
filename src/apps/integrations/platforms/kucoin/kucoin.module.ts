// Package modules
import { Module } from '@nestjs/common';

// Controllers
import { KucoinController } from './kucoin.controller';

// Services
import { KucoinService } from './kucoin.service';

@Module({
  controllers: [
    KucoinController
  ],
  providers: [
    KucoinService
  ],
  exports: [
    KucoinService
  ]
})
export class KucoinModule {}
