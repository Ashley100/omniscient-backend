import { Injectable } from '@nestjs/common';

@Injectable()
export class WatcherService {

  getAllPairs() {
    return "get all";
  }

  getOnePair() {
    return "get pair";
  }

}
