import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WatcherService {

  constructor(
    private eventEmitter: EventEmitter2
  ) {

    this.eventEmitter.emit(
      'some.event',
      {
        somePayload: "my payload"
      }
    )

  }

  getAllPairs() {
    return "get all";
  }

  getOnePair() {
    return "get pair";
  }

}
