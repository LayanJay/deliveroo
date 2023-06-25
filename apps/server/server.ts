// Import Express App
import dotenv from 'dotenv';
import db from './models';
import app from './src/app';
import logger from './src/logger';

dotenv.config();

// Config
const port = 4000;
const host = `localhost`;
const env = process.env.NODE_ENV || 'development';

// Listening to Requests
const main = async () => {
  try {
    // Connecting to Database
    await db.sequelize.sync({ alter: env === 'development' }).then(() => {
      app.listen(port, host, () => logger.info(`Server listening on port ${port} at ${host}`));
    });
  } catch (e) {
    logger.error('Init error: ' + e);
  }
};

main();
