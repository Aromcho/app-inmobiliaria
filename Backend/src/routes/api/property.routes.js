import express from 'express';
import {
  createProperty, // Importamos la nueva función para crear una propiedad
  getPropertiesByUserId,
  getProperties,
  getPropertyById,
  getRelatedProperties,
  getNeighborhoods,
  getFavorites,
  sendContactEmail,
  getAllPropertyIds,
  getpropertyById,
  autocompleteProperties,
} from '../../controllers/property.controller.js';

const propertyDetail = express.Router();

propertyDetail.get('/autocomplete', autocompleteProperties);
propertyDetail.get('/properties', getProperties);
propertyDetail.get('/propertyDetail/:id', getpropertyById);
propertyDetail.get('/neighborhoods', getNeighborhoods);
propertyDetail.get('/:id', getPropertyById);
propertyDetail.get('/propertyDetail/:id/related', getRelatedProperties);
propertyDetail.get('/favorites', getFavorites);
propertyDetail.post('/contact', sendContactEmail);
propertyDetail.get('/properties/ids', getAllPropertyIds);

// Nueva ruta para crear una propiedad
propertyDetail.post('/', createProperty);
propertyDetail.get('/publications/:user_id', getPropertiesByUserId);
// Exportar el enrutador
export default propertyDetail;
