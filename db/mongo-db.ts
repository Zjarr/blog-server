import Mongoose from 'mongoose';

import { Env } from '../env';
import { Logger } from '../logger';

/**
 * MongoDB server connection string
 */
const mongoURL = `${Env.DB_PROTOCOL}://${Env.DB_USERNAME}:${Env.DB_PASSWORD}@${Env.DB_LOCATION}/${Env.DB_NAME}?${Env.DB_PARAMS}`;

/**
 * MongoDB number of retries and db timeout
 * Attributes for handling a disconnection event
 */
const dbTimeout = parseInt(Env.DB_CONNECTION_TIMEOUT, 10);
const MILISECONDS = 1000;
const numberOfRetries = parseInt(Env.DB_CONNECTION_RETRIES, 10);

let retriesCount = 0;
let timeout: NodeJS.Timeout;

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
  if (timeout) {
    clearTimeout(timeout);
  }

  if (retriesCount >= numberOfRetries) {
    Logger.warn(`We were not able to reconnect. Maximun number of connection retries reached (${numberOfRetries})`, {
      source: 'MongoDB'
    });

    clearTimeout(timeout);
    process.exit(0);
  }

  Logger.warn(`MongoDB disconnected. Trying to connect in ${dbTimeout / MILISECONDS}s`, {
    source: 'MongoDB'
  });

  timeout = setTimeout(() => {
    retriesCount++;
    Connect();
  }, dbTimeout);
});

/**
 * Reconnection Event
 */
connection.on('reconnected', () => {
  clearTimeout(timeout);
  retriesCount = 0;

  Logger.info('MongoDB reconnected', {
    source: 'MongoDB'
  });
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
