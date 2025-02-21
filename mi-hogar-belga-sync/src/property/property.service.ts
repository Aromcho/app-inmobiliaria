import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Property } from './schemas/property.schema/property.schema';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);
  private readonly TOKKO_API_URL =
    'https://www.tokkobroker.com/api/v1/property/';

  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  async syncWithTokko(): Promise<void> {
    const limit = 100;
    let offset = 0;
    let total_count = 0;
    const syncedIds = new Set<number>();

    try {
      this.logger.log('Syncing properties with Tokko');

      do {
        const response = await axios.get(this.TOKKO_API_URL, {
          params: {
            key: process.env.TOKKO_TOKEN,
            limit,
            offset,
            lang: 'es_ar',
            format: 'json',
          },
        });

        const properties = response.data.objects;
        total_count = response.data.meta.total_count;

        this.logger.log(
          `Obtenidas ${properties.length} propiedades de un total de ${total_count}.`,
        );

        const operations = properties.map(property => {
          syncedIds.add(property.id);
        
          // Asignamos la inmobiliaria como 'Belga'
          property.realEstateAgency = 'Belga';
        
          // Aseguramos que `divisions` tenga el formato correcto
          if (!Array.isArray(property.location?.divisions)) {
            property.location.divisions = [];
          } else {
            property.location.divisions = property.location.divisions.map(division => ({
              id: division.id || 0,
              name: division.name || '',
              resource_uri: division.resource_uri || '',
            }));
          }
        
          return {
            updateOne: {
              filter: { id: property.id },
              update: { $set: property },
              upsert: true,
            },
          };
        });
        

        if (operations.length > 0) {
          await this.propertyModel.bulkWrite(operations);
          this.logger.log(`Sincronizadas ${operations.length} propiedades.`);
        }

        offset += limit;
      } while (offset < total_count);

      await this.propertyModel.deleteMany({
        id: { $nin: Array.from(syncedIds) },
        realEstateAgency: 'Belga',
      });
      this.logger.log('Sincronizacion completada.');
    } catch (error) {
      this.logger.error('Error al sincronizar propiedades con Tokko', error);
    }
  }
}
