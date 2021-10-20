// Package modules
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Models
import { ChartModel, CreateChartDto } from '../models/chart.model';

@Injectable()
export class ChartsService {

  constructor(
    @InjectModel(ChartModel)
    private readonly chartRepository: typeof ChartModel
  ) {
    this.chartRepository.afterCreate((candle) => this.afterCandleCreated(candle));
  }

  // Private methods
  private async afterCandleCreated(candle) {
    await this.updatePreviousCandle(candle);

    const previousCandles = await this.chartRepository.findAll({
      limit: 3,
      order: [
        [ 'createdAt', 'DESC' ]
      ]
    });

    console.log("👉", 'afterCandleCreated!!!!', "👈");
    console.log("👉", 'get three previous candles to apply a strategy', "👈");
  }

  private async updatePreviousCandle(currentCandle) {
    const previousCandle = await this.chartRepository.findOne({ where: { id: currentCandle.id - 1} });
    await previousCandle.update({
      close_price: currentCandle.open_price,
      direction: currentCandle.open_price > previousCandle.open_price ? 'up' : 'down'
    });
  }

  async createCandle(chartDto: CreateChartDto) {
    const chart = await this.chartRepository.findOrCreate(
      {
        where: {
          opened_at: chartDto.opened_at
        },
        defaults: chartDto
      }
    );
    return chart;
  }

  async updateCandle(chartDto) {
    const chart = await this.chartRepository.update(chartDto, {
      where: {
        opened_at: chartDto.opened_at
      }
    });
    return chart;
  }

  async getCandle(condition) {
    const chart = await this.chartRepository.findOne({
      where: {
        ...condition
      }
    });
    return chart;
  }

  async getCandleByOpenedAt(opened_at: string) {
    const chart = await this.chartRepository.findOne({
      where: {
        opened_at: opened_at
      }
    });
    return chart;
  }
}
