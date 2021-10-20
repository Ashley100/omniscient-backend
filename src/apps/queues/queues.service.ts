// Package modules
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueuesService {

  constructor() {}

  getAllPairs() {
    return "get all";
  }

  getOnePair() {
    return "get pair";
  }

}
