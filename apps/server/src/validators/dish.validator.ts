import Ajv from 'ajv';
const ajv = new Ajv();

const dishSchema = {
  type: 'object',
  properties: {
    dishName: { type: 'string' },
    isAvailable: { type: 'boolean', default: true },
    price: { type: 'number' },
    description: { type: 'string' },
    calories: { type: 'number' },
    image: { type: 'string' },
  },
  required: ['dishName', 'price', 'description', 'image'],
  additionalProperties: false,
};

const dishValidator = ajv.compile(dishSchema);

export default dishValidator;
