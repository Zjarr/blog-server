import { ApolloServer, OptionsJson, CorsOptions } from 'apollo-server-express';
import Express from 'express';
import { Server } from 'http';

import { Connect } from './db';
import { Env } from './env';
import { Logger } from './logger';
import { config } from './src';

/**
 * Add all required ENV variables here.
 * Check env.ts for all the ones that are set
 */
const requiredVars: string[] = [
  'CLIENT',
  'NODE_ENV',
  'PLAYGROUND',
  'PORT',

  'CLOUDINARY_API_KEY',
  'CLOUDINARY_NAME',
  'CLOUDINARY_SECRET',

  'DB_PROTOCOL',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_LOCATION',
  'DB_NAME',
  'DB_PARAMS',

  'JWT_PRIVATE',
  'JWT_EXPIRE',

  'LOGGLY_ENABLED',
  'LOGGLY_SUBDOMAIN',
  'LOGGLY_TOKEN'
];

/**
 * Raise a warning if there are missing ENV variables
 */
requiredVars.forEach(option => {
  if (!Env.hasOwnProperty(option)) {
    Logger.warn(`'${option}' environment varibale required`);
  }
});

/**
 * Configure the Apollo Server with schemas and context
 */
const server = new ApolloServer({ ...config });
const PORT = Env.PORT;
const app = Express();

/**
 * Set server middlewares
 */
const bodyParserConfig: OptionsJson = {
  limit: '10mb'
};

const cors: CorsOptions = {
  origin: Env.CLIENT
};

server.applyMiddleware({ app, cors, bodyParserConfig  });

/**
 * If the server connection had errors it is going to
 * show posible causes
 */
const onError = (error: { syscall: string; code: string }): void => {
  Logger.error(error);
  throw error;
};

/**
 * If the server connections didn't had errors it will throw
 * a console success message
 */
const onListening = (): void => {
  Logger.info(`Environment: ${Env.NODE_ENV}`);
  Logger.info(`Port: ${PORT}`);
};

/**
 * Inits the server and listens for a successful initialization or errors
 */
const initServer = (): Server => {
  return app
    .listen(PORT)
    .on('error', onError)
    .on('listening', onListening);
};

/**
 * Tries to connect to an instance of MongoDB,
 * if it is successful it is going to init the server on the specified port
 */
const initDBConnection = async (): Promise<Server | string> => {
  const result = await Connect();

  if (result.connection.readyState !== 1) {
    return process.exit(0);
  }

  return initServer();
};

initDBConnection();
