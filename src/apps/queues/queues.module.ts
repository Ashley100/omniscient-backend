// Package modules
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

// Local modules
import { QUEUES_TYPES } from '../../lib/config/config';

// Modules
import { ChartsModule } from '../charts/charts.module';

// Producers
import { StrategiesQueueProducer } from './jobs/strategies.producer';

// Consumers
import { StrategiesQueueConsumer } from './jobs/strategies.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: QUEUES_TYPES.STRATEGY_QUEUE
    }),

    ChartsModule,
  ],
  providers: [
    StrategiesQueueProducer,
    StrategiesQueueConsumer,
  ],
  exports: [
    StrategiesQueueProducer,
    StrategiesQueueConsumer
  ]
})
export class QueuesModule {}
