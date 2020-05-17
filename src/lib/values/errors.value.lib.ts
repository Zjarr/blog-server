import { Error } from '../../error/schema';

const codes = {
  // 4xx Client error
  400: { code: 400, status: 'Bad Request' },
  401: { code: 401, status: 'Unauthorized' },
  402: { code: 402, status: 'Payment Required' },
  403: { code: 403, status: 'Forbidden' },
  404: { code: 404, status: 'Not Found' },
  405: { code: 405, status: 'Method Not Allowed' },
  406: { code: 406, status: 'Not Acceptable' },
  407: { code: 407, status: 'Proxy Authentication Required' },
  408: { code: 408, status: 'Request Timeout' },
  409: { code: 409, status: 'Conflict' },
  410: { code: 410, status: 'Gone' },
  411: { code: 411, status: 'Length Required' },
  412: { code: 412, status: 'Precondition Failed' },
  413: { code: 413, status: 'Request Entity Too Large' },
  414: { code: 414, status: 'Request-URI Too Long' },
  415: { code: 414, status: 'Unsupported Media Type' },
  416: { code: 416, status: 'Requested Range Not Satisfiable' },
  417: { code: 417, status: 'Expectation Failed' },
  426: { code: 426, status: 'Upgrade Required' },
  428: { code: 428, status: 'Precondition Required' },
  429: { code: 429, status: 'Too Many Requests' },
  431: { code: 431, status: 'Request Header Fields Too Large' },
  444: { code: 444, status: 'No Response' },
  451: { code: 451, status: 'Unavailable For Legal Reasons' },

  // 5xx Server code
  500: { code: 500, status: 'Internal Server Error' },
  501: { code: 501, status: 'Not Implemented' },
  502: { code: 502, status: 'Bad Gateway' },
  503: { code: 503, status: 'Service Unavailable' },
  504: { code: 504, status: 'Gateway Timeout' },
  505: { code: 505, status: 'HTTP Version Not Supported' },
  509: { code: 509, status: 'Bandwidth Limit Exceeded' },
  510: { code: 510, status: 'Not Extended' },
  511: { code: 511, status: 'Network Authentication Required' },
  598: { code: 598, status: 'Network read timeout error' },
  599: { code: 599, status: 'Network connect timeout error' },
};

const formatError = (error: { status: string; code: number }, message?: string): Error => {
  return {
    error: {
      status: error.status,
      code: error.code,
      message,
    }
  };
};

export const unauthorized = (message?: string): Error => formatError(
  codes['401'],
  message
);

export const forbidden = (message?: string): Error => formatError(
  codes['403'],
  message
);

export const notFound = (message?: string): Error => formatError(
  codes['404'],
  message
);

export const conflict = (message?: string): Error => formatError(
  codes['409'],
  message
);

export const serverError = (message?: string): Error => formatError(
  codes['500'],
  message
);
