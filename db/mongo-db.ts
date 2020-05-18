import Mongoose from 'mongoose';

import { Env } from '../env';
import { Logger } from '../logger';

/**
 * MongoDB server connection string
 */
const mongoURL = `${Env.DB_PROTOCOL}://${Env.DB_USERNAME}:${Env.DB_PASSWORD}@${Env.DB_LOCATION}/${Env.DB_NAME}?${Env.DB_PARAMS}`;

/**
 * MongoDB connection options
 */
Mongoose.Promise = global.Promise;

const connection = Mongoose.connection;
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

/**
 * Displays information on the console while connecting to MongoDB
 */
connection.on('connecting', () => {
  Logger.info(`Connecting to MongoDB using ${Env.NODE_ENV} configuration`, {
    source: 'MongoDB'
  });
});

/**
 * Displays connection errors on the console if they happen at any moment
 */
connection.on('error', (error) => {
  Logger.error(`${error}`, {
    source: 'MongoDB'
  });
});

/**
 * If the connection is successful it displays the result
 */
connection.once('open', () => {
  Logger.info('MongoDB connection established', {
    source: 'MongoDB'
  });
});

/**
 * If for some reason there is a connection issue,
 * the server will try to reconnect to MongoDB
 */
connection.on('disconnected', () => {
  Logger.warn(`We had problems connecting to MongoDB. Please restart the server.`, {
    source: 'MongoDB'
  });

  process.exit(0);
});

/**
 * If the node process fail, closes the mongo connection
 */
process.on('SIGINT', () => {
  connection.close(() => {
    Logger.info('MongoDB connection closed', {
      source: 'MongoDB'
    });

    process.exit(0);
  });
});

/**
 * Main connection function
 * Call this to try a MongoDB connection
 */
export const Connect = async (): Promise<typeof Mongoose> => {
  return Mongoose.connect(mongoURL, options);
};
