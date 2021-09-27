import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WatcherService } from './watcher.service';

class CreateCatDto {
  id: number;
  name: string;
}

@Controller('watcher')
export class WatcherController {

  constructor(private readonly watcherService: WatcherService) {}

  @Get()
  getAll() {
    return this.watcherService.getAllPairs();
  }

  @Post()
  create(@Body()
    {
      id,
      name
    }: CreateCatDto
  ): string {
    // return this.watcherService.getOnePair();
    return `${id}, ${name}`;
  }

}
