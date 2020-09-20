import { ApolloServer, CorsOptions, OptionsJson } from 'apollo-server-express';
import Express from 'express';
import { Server } from 'http';

import { Connect } from './db';
import { Env } from './env';
import { Log } from './logger';
import { config } from './src';

/**
 * Init the Apollo server
 */
const initServer = (): Server => {
  const server = new ApolloServer({ ...config });
  const PORT = Env.PORT;
  const app = Express();

  const bodyParserConfig: OptionsJson = {
    limit: '10mb'
  };

  const cors: CorsOptions = {
    origin: Env.CLIENT,
    credentials: true
  };

  server.applyMiddleware({ app, bodyParserConfig, cors });

  /**
   * If there is an error with the initialization it shows the details
   * @param error information about the error
   */
  const onError = (error: object): void => {
    Log.error('Server error', error);
    throw error;
  };

  /**
   * If the connection is successful it shows the connection information
   */
  const onListening = (): void => {
    Log.info(`Environment: ${Env.NODE_ENV}`);
    Log.info(`Port: ${PORT}`);
  };

  return app
    .listen(PORT)
    .on('error', onError)
    .on('listening', onListening);
};

/**
 * Inits the connection with the DB
 */
const initDBConnection = async (): Promise<Server | string> => {
  const result = await Connect();

  if (result.connection.readyState !== 1) {
    return process.exit(0);
  }

  return initServer();
};

/**
 * Checks the environment variables to start the server.
 * If there is something missing it won't start it.
 */
const checkEnvironmentVariables = (): Promise<string | Server> => {
  let correctEnvVariables = true;

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
    'JWT_EXPIRE'
  ];

  requiredVars.forEach(option => {
    if (!Env.hasOwnProperty(option)) {
      Log.warn(`Required environment variable is missing: '${option}'`);
      correctEnvVariables = false;
    }
  });

  if (correctEnvVariables) {
    return initDBConnection();
  }

  return process.exit(0);
};

/**
 * Check the env variables before connectiong with the DB
 * and starting the apollo server.
 */
checkEnvironmentVariables();
