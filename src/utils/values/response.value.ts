import { IError } from '../../error/schema';

const codes = {
  // 4xx Client error
  400: { code: 400, status: 'Bad Request' },
  401: { code: 401, status: 'Unauthorized' },
  403: { code: 403, status: 'Forbidden' },
  404: { code: 404, status: 'Not Found' },
  409: { code: 409, status: 'Conflict' },

  // 5xx Server code
  500: { code: 500, status: 'Internal Server Error' },
};

const formatError = (error: { status: string; code: number }, message?: string): IError => {
  return {
    error: {
      status: error.status,
      code: error.code,
      message,
    }
  };
};

export const badRequest= (message?: string): IError => formatError(
  codes['400'],
  message
);

export const unauthorized = (message?: string): IError => formatError(
  codes['401'],
  message
);

export const forbidden = (message?: string): IError => formatError(
  codes['403'],
  message
);

export const notFound = (message?: string): IError => formatError(
  codes['404'],
  message
);

export const conflict = (message?: string): IError => formatError(
  codes['409'],
  message
);

export const serverError = (message?: string): IError => formatError(
  codes['500'],
  message
);
