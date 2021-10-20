// Package modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';
import { IntegrationsService } from './apps/integrations/integrations.service';

// Modules
import { IntegrationsModule } from './apps/integrations/integrations.module';
import { ChartsModule } from './apps/charts/charts.module';

// Local modules
import { USER } from './lib/config/constants';

// Models
import { ChartModel } from './apps/charts/models/chart.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [ChartModel],
      autoLoadModels: true
    }),
    ChartsModule,
    IntegrationsModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    ChartsModule
  ],
})
export class AppModule {
  constructor(
    private integrationsService: IntegrationsService
  ) {
    this.run();
  }

  async run() {
    await this.integrationsService.start(
      USER.pairs,
      USER.platforms
    );
  }
}
