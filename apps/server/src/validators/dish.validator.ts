import Ajv from 'ajv';
const ajv = new Ajv();

const dishSchema = {
  type: 'object',
  properties: {
    dishName: { type: 'string' },
  },
  required: ['dishName'],
  additionalProperties: false,
};

const dishValidator = ajv.compile(dishSchema);

export default dishValidator;
