// Package modules
import { Module } from '@nestjs/common';

// Local modules
import { KucoinService } from './kucoin.service';

@Module({
  providers: [
    KucoinService
  ]
})
export class KucoinModule {}
