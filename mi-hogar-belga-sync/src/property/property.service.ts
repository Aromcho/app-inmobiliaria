import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Property } from './schemas/property.schema/property.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);
  private readonly TOKKO_API_URL = 'https://www.tokkobroker.com/api/v1/property/';
  private readonly agenciaNombre: string;

  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
    private readonly configService: ConfigService
  ) {
    this.agenciaNombre = this.configService.get<string>('AGENCIA_NOMBRE', 'Desconocido');

    if (!this.agenciaNombre) {
      throw new Error('❌ ERROR: La variable de entorno AGENCIA_NOMBRE es obligatoria.');
    }
  }

  async syncWithTokko(): Promise<void> {
    const limit = 20;
    let offset = 0;
    let total_count = 0;
    const syncedIds = new Set<number>();

    try {
      this.logger.log(`Iniciando sincronización con Tokko para ${this.agenciaNombre}...`);

      do {
        const response = await axios.get(this.TOKKO_API_URL, {
          params: {
            key: this.configService.get<string>('TOKKO_TOKEN'),
            limit,
            offset,
            lang: 'es_ar',
            format: 'json',
          },
        });

        const properties = response.data.objects;
        total_count = response.data.meta.total_count;

        this.logger.log(`Obtenidas ${properties.length} propiedades de un total de ${total_count}.`);

        const operations = properties.map(property => {
          syncedIds.add(property.id);
          property.realEstateAgency = this.agenciaNombre; // 🔹 Se asigna automáticamente

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
          this.logger.log(`Actualizadas/insertadas ${operations.length} propiedades.`);
        }

        offset += limit;
      } while (offset < total_count);

      // Eliminar propiedades que ya no existen en Tokko y son de la misma agencia
      await this.propertyModel.deleteMany({
        id: { $nin: Array.from(syncedIds) },
        realEstateAgency: this.agenciaNombre,
      });

      this.logger.log(`✅ Sincronización completada para ${this.agenciaNombre}.`);
    } catch (error) {
      this.logger.error(`❌ Error al sincronizar propiedades con Tokko para ${this.agenciaNombre}`, error);
    }
  }
}
