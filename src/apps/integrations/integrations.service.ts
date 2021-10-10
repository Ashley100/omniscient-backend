// Package modules
import { Injectable } from '@nestjs/common';

// Services
import { IntegrationService } from './integration.service';


@Injectable()
export class IntegrationsService {

  constructor(
    private integrationService: IntegrationService,
  ) {}

  async start(
    pairs: Array<string>,
    platforms: Array<string>
  ) {

    return await this.parsePricesFromPlatforms(pairs, platforms);
  }

  async parsePricesFromPlatforms(
    pairs: Array<string>,
    platforms: Array<string>
  ) {

    const orderBooks = await this.integrationService.getAllOrderBooks(pairs, platforms);

    return this.integrationService.getBestOffers(orderBooks);
  }

}
