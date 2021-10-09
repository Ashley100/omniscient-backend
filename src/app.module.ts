// Package modules
import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';
import { WatcherController } from './apps/watcher/watcher.controller';

// Services
import { AppService } from './app.service';
import { IntegrationsService } from './apps/integrations/integrations.service';
import { WatcherService } from './apps/watcher/watcher.service';

// Modules
import { WatcherModule } from './apps/watcher/watcher.module';

// Local modules
import { USER } from './lib/config/constants';

// Interfaces
import { IntegrationsModule } from './apps/integrations/integrations.module';

@Module({
  imports: [
    WatcherModule,
    IntegrationsModule
  ],
  controllers: [
    AppController,
    WatcherController
  ],
  providers: [
    AppService,
    WatcherService,
    IntegrationsService
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
    // setInterval(async () => {
    //   await this.integrationsService.start(
    //     [GENERAL_PAIRS.BTCUSDT, GENERAL_PAIRS.ETHUSDT],
    //     [PLATFORMS.binance, PLATFORMS.kucoin, PLATFORMS.bybit]
    //   );
    // }, 2000);
  }
}
