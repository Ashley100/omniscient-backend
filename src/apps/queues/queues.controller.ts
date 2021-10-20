// Package modules
import { Body, Controller, Get, Post } from '@nestjs/common';

// Services
import { QueuesService } from './queues.service';

@Controller('watcher')
export class QueuesController {

  constructor(private readonly queuesService: QueuesService) {}

  @Get()
  getAll() {
    return "so me GET data";
  }

  @Post()
  create(@Body()
    {
      id,
      name
    }
  ): string {
    return `${id}, ${name}`;
  }

}
