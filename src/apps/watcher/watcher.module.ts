// Package modules
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

// Services
import { WatcherService } from './watcher.service';

@Module({
  imports: [
    EventEmitterModule.forRoot()
  ],
  providers: [
    WatcherService
  ]
})
export class WatcherModule {
  constructor() {}
}
