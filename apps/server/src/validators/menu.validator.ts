import Ajv from 'ajv';
const ajv = new Ajv();

const menuSchema = {
  type: 'object',
  properties: {
    categoryName: { type: 'string' },
  },
  required: ['categoryName'],
  additionalProperties: false,
};

const menuValidator = ajv.compile(menuSchema);

export default menuValidator;
