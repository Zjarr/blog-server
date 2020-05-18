import Winston from 'winston';

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
 * Setting transports.
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

/**
 * Logger creation using to transport types:
 * Console: for most developer required information
 * File: for most errors
 */
export const Logger = Winston.createLogger({
  exitOnError: false,
  transports
});
