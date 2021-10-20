// Package modules
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Services
import { ChartsService } from './services/charts.service';
import { ChartsQueuesService } from './services/charts.queues.service';

// Models
import { ChartModel } from './models/chart.model';
import { ChartsQueuesModel } from './models/charts.queues.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ChartModel,
      ChartsQueuesModel
    ])
  ],
  providers: [
    ChartsService,
    ChartsQueuesService,
  ],
  exports: [
    ChartsService,
    ChartsQueuesService,
  ]
})
export class ChartsModule {}
