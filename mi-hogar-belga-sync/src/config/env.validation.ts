import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  TOKKO_TOKEN: Joi.string().required().messages({
    'any.required': '❌ ERROR: La variable de entorno TOKKO_TOKEN es obligatoria.',
  }),
  AGENCIA_NOMBRE: Joi.string().required().messages({
    'any.required': '❌ ERROR: La variable de entorno AGENCIA_NOMBRE es obligatoria.',
  }),
  PORT: Joi.number().default(3000),
});
