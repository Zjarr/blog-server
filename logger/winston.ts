import Winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';

import { Env } from '../env';

/**
 * Sets the colors for sertain levels
 */
const colors = {
  error: 'bold red',
  warn: 'bold yellow',
  info: 'bold cyan',
  verbose: 'bold gray',
  debug: 'bold gray',

};

/**
 * Adds custom colors
 */
Winston.addColors(colors);

/**
 * Formats the out as the developer wants, showing required information
 */
const infoOutput = Winston.format.printf(info => {
  return `[${info.source ? info.source : 'Server'}] ${info.timestamp} ${info.level}: ${info.message}`;
});

/**
 * Setting transports. Loggly included
 */
const transports = [];

transports.push(
  new Winston.transports.Console({
    format: Winston.format.combine(
      Winston.format.colorize(),
      Winston.format.timestamp(),
      Winston.format.splat(),
      infoOutput
    ),
    level: 'debug'
  })
);

if (Env.LOGGLY_ENABLED === 'true') {
  transports.push(
    new Loggly({
      json: true,
      subdomain: Env.LOGGLY_SUBDOMAIN,
      tags: [Env.NODE_ENV],
      token: Env.LOGGLY_TOKEN,
    })
  );
}

/**
 * Logger creation using to transport types:
 * Console: for most developer required information
 * File: for most errors
 */
export const Logger = Winston.createLogger({
  exitOnError: false,
  transports
});
