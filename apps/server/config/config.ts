export const config = {
  development: {
    username: 'root',
    password: 'tmatdtp2@',
    database: 'deliveroo',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: 'localhost',
    dialect: 'mysql',
  },
};
