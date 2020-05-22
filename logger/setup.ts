/* eslint-disable no-console */
interface IDetails {
  source?: string;
  details?: string | number | object;
}

interface ILogger {
  debug: (message: string, object?: IDetails) => void;
  error: (message: string, object?: IDetails) => void;
  info: (message: string, object?: IDetails) => void;
  warn: (message: string, object?: IDetails) => void;
}

/**
 * Colors for the various log levels
 */
const ColorMap = new Map([
  ['Debug', '\x1b[32m'],
  ['Error', '\x1b[31m'],
  ['Info', '\x1b[36m'],
  ['Warn', '\x1b[33m']
]);

/**
 * ASCII escape characters
 */
const boldText = '\u001B[1m';
const clearStyle = '\x1b[0m';

/**
 * Logger configuration and level handling
 */
export const Logger = (): ILogger => {
  const printToConsole = (level: string, message: string, object?: IDetails): void => {
    const info = object && object.details ? object.details : null;
    const source = object && object.source ? object.source : 'Server';
    const timeStamp = new Date().toISOString();
    const levelStyle = `${ColorMap.get(level)}${boldText}`;

    console.log(`[${source}] ${timeStamp} ${levelStyle}${level}${clearStyle}: ${message}`);

    if (info) {
      console.log(`[${source}] ${timeStamp} ${levelStyle}Details:${clearStyle}`, info);
    }
  };

  const debug = (message: string, object?: IDetails): void => {
    printToConsole('Debug', message, object);
  };

  const error = (message: string, object?: IDetails): void => {
    printToConsole('Error', message, object);
  };

  const info = (message: string, object?: IDetails): void => {
    printToConsole('Info', message, object);
  };

  const warn = (message: string, object?: IDetails): void => {
    printToConsole('Warn', message, object);
  };

  return {
    debug,
    error,
    info,
    warn
  };
};
