import { Body, Controller, Query, Get, Param, Post, Req } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

class CreateCatDto {
  id: number;
  name: string;
}

@Controller('integrations')
export class IntegrationsController {

  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  async getAll(
    @Query('symbols') symbols: any,
    @Query('platforms') platforms: any,
  ) {
    return await this.integrationsService.start(symbols.split(','), platforms.split(','));
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
