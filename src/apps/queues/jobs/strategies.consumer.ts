// Package modules
import {
  OnQueueCompleted,
  OnQueueProgress,
  OnQueueActive,
  Process,
  Processor
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

// Local modules
import {
  QUEUES_TYPES,
  JOB_TYPES
} from '../../../lib/config/config';

// Services
import { ChartsQueuesService } from '../../charts/services/charts.queues.service';

@Processor(QUEUES_TYPES.STRATEGY_QUEUE)
export class StrategiesQueueConsumer {

  constructor(
    private chartsQueuesService: ChartsQueuesService
  ) {}

  private readonly logger = new Logger();

  async doJob(job) {
    for (let i = 0; i < 100000; i++) {
      await job.progress(i / 100);
    }
  }

  @Process(JOB_TYPES.STRATEGY_CALCULATE_JOB)
  async process(job: Job) {
    await this.doJob(job);
    console.log("👉", '------------commplete------------', "👈");
  }

  @OnQueueProgress({
    name: JOB_TYPES.STRATEGY_CALCULATE_JOB
  })
  onQueueProgress(job: Job) {
    // console.log("👉", job.progress(), "👈");
  }

  @OnQueueCompleted({
    name: JOB_TYPES.STRATEGY_CALCULATE_JOB
  })
  async onQueueComplete(job: Job, result: any) {
    this.logger.log("👉 onQueueComplete 👈"  + job.id, 'onQueueComplete');
    await this.chartsQueuesService.updateJob(job.id, {
      inProcess: false,
      completedAt: new Date()
    })
  }

  @OnQueueActive({
    name: JOB_TYPES.STRATEGY_CALCULATE_JOB
  })
  async onQueueActive(job: Job, result: any) {
    this.logger.log("👉 onQueueActive 👈" + job.id, 'onQueueActive');

    // await this.chartsQueuesService.createJob({
    //   jobId: job.id,
    //   createdAt: new Date(),
    //   inProcess: true,
    //   owner: job.data.owner,
    //   queue: QUEUES_TYPES.STRATEGY_QUEUE
    // })
  }
}
