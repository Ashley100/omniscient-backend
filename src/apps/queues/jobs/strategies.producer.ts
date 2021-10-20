// Package modules
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

// Local modules
import {
  QUEUES_TYPES,
  JOB_TYPES
} from '../../../lib/config/config';
import { ERRORS } from '../../../lib/config/errors';

@Injectable()
export class StrategiesQueueProducer {

  private readonly MAX_QUEUE_STACK = 5;

  private readonly logger = new Logger();

  constructor(
    @InjectQueue(QUEUES_TYPES.STRATEGY_QUEUE)
    private queue: Queue
  ) {}

  async addJob(
    jobName:string,
    owner: string,
    payload:any
  ) {
    const isQueueAvailable = await this.isQueueAvailable();

    if (isQueueAvailable) {
      if (Object.values(JOB_TYPES).includes(jobName)) {
        await this.queue.add(
          jobName,
          {
            payload: payload,
            owner: owner,
            createdAt: new Date()
          }
        );
      } else {
        this.logger.warn(ERRORS.JOB_NOT_DEFINED, 'StrategiesQueueProducer');
      }
    } else {
      this.logger.warn(ERRORS.QUEUE_LIMIT_EXCEEDED, 'StrategiesQueueProducer');
    }
  }

  async getActiveCount() {
    return await this.queue.getActiveCount();
  }

  async isQueueEmpty() {
    const activeQueueCount = await this.queue.getActiveCount();
    return activeQueueCount === 0;
  }

  async isQueueAvailable() {
    const activeQueueCount = await this.queue.getActiveCount();
    return activeQueueCount < this.MAX_QUEUE_STACK;
  }

  removeJob() {

  }

  clearJobs() {

  }

}
