import Ajv from 'ajv';

const ajv = new Ajv();

const restaurantSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' },
    phone: { type: 'string' },
  },
  required: ['name', 'address', 'phone'],
  additionalProperties: false,
};

const restaurantValidator = ajv.compile(restaurantSchema);

export default restaurantValidator;
