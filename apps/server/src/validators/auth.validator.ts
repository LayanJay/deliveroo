import Ajv from 'ajv';
const ajv = new Ajv();

const loginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: true,
};

const registerSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['email', 'password', 'firstName', 'lastName'],
  additionalProperties: false,
};

const loginValidator = ajv.compile(loginSchema);
const registerValidator = ajv.compile(registerSchema);

export { loginValidator, registerValidator };
