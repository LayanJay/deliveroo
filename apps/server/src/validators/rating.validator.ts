import Ajv from 'ajv';
const ajv = new Ajv();

const ratingSchema = {
  type: 'object',
  properties: {
    rating: { type: 'number' },
    comment: { type: 'string' },
  },
  required: ['rating', 'comment'],
  additionalProperties: false,
};

const ratingValidator = ajv.compile(ratingSchema);

export default ratingValidator;
