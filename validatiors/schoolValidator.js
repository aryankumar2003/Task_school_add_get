const Joi = require('joi');

const schoolSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

module.exports = { schoolSchema };
