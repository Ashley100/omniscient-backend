// Package modules
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Models
import { ChartsQueuesModel, ChartsQueuesDto } from '../models/charts.queues.model';

@Injectable()
export class ChartsQueuesService {

  constructor(
    @InjectModel(ChartsQueuesModel)
    private readonly chartsQueuesRepository: typeof ChartsQueuesModel
  ) {}

  async createJob(queuesDto: ChartsQueuesDto) {
    const chart = await this.chartsQueuesRepository.findOrCreate(
      {
        where: {
          jobId: queuesDto.jobId
        },
        defaults: queuesDto
      }
    );
    return chart;
  }

  async updateJob(jobId, queuesDto) {
    const chart = await this.chartsQueuesRepository.update(queuesDto, {
      where: {
        jobId: jobId
      }
    });
    return chart;
  }

  async getJob(jobId: number) {
    const chart = await this.chartsQueuesRepository.findOne({
      where: {
        jobId: jobId
      }
    });
    return chart;
  }
}
