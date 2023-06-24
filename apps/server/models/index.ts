'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { DataTypes, Dialect, Sequelize } from 'sequelize';
import config from '../config/config.json';
import logger from '../src/logger';
const basename = _basename(__filename);

let sequelize: Sequelize;
sequelize = new Sequelize(
  config['development'].database,
  config['development'].username,
  config['development'].password,
  {
    host: config['development'].host,
    dialect: config['development'].dialect as Dialect,
    logging: (msg) => logger.log('debug', msg),
  }
);

const db: { sequelize: Sequelize; Sequelize: typeof Sequelize; [key: string]: any } = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
