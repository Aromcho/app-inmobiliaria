import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schemas/property.schema/property.schema';
import { PropertyService } from './property.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PropertyCronService } from './property.cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [PropertyService, PropertyCronService],
  exports: [PropertyService],
})
export class PropertyModule {}
