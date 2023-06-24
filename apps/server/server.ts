// Import Express App
import db from './models';
import app from './src/app';
import logger from './src/logger';

// Config
const port = 5000;
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
