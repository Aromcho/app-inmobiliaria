import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PropertyService } from './property.service';

@Injectable()
export class PropertyCronService {
  private readonly logger = new Logger(PropertyCronService.name);

  constructor(private readonly propertyService: PropertyService) {}

  @Cron('*/1 * * * *')
  async handleCron() {
    this.logger.log('Syncing properties with Tokko');
    await this.propertyService.syncWithTokko();
  }
}