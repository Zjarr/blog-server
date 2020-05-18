/**
 * Having only one file reduces the amount of
 * process.env.VARIABLE declarations
 */
export const Env = {
  CLIENT: process.env.CLIENT,
  NODE_ENV: process.env.NODE_ENV,
  PLAYGROUND: process.env.PLAYGROUND,
  PORT: process.env.PORT,

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,

  DB_PROTOCOL: process.env.DB_PROTOCOL,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_LOCATION: process.env.DB_LOCATION,
  DB_NAME: process.env.DB_NAME,
  DB_PARAMS: process.env.DB_PARAMS,

  JWT_PRIVATE: process.env.JWT_PRIVATE,
  JWT_EXPIRE: process.env.JWT_EXPIRE,

  LOGGLY_ENABLED: process.env.LOGGLY_ENABLED,
  LOGGLY_SUBDOMAIN: process.env.LOGGLY_SUBDOMAIN,
  LOGGLY_TOKEN: process.env.LOGGLY_TOKEN
};
