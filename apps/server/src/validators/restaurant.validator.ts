import Ajv from 'ajv';

const ajv = new Ajv();

const restaurantSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' },
    phone: { type: 'string' },
    image: { type: 'string' },
    tags: { type: 'string' },
    openingHours: { type: 'string' },
    closingHours: { type: 'string' },
    deliveryFee: { type: 'number' },
    minimumOrderValue: { type: 'number' },
  },
  required: [
    'name',
    'address',
    'phone',
    'image',
    'tags',
    'openingHours',
    'closingHours',
    'deliveryFee',
    'minimumOrderValue',
  ],
  additionalProperties: false,
};

const restaurantValidator = ajv.compile(restaurantSchema);

export default restaurantValidator;
