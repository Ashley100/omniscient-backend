// Package modules
import { Module } from '@nestjs/common';

// Local modules
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationsService } from './apps/integrations/integrations.service';

import { WatcherService } from './apps/watcher/watcher.service';
import { WatcherController } from './apps/watcher/watcher.controller';
import { WatcherModule } from './apps/watcher/watcher.module';

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
    await this.integrationsService.start();
  }
}
