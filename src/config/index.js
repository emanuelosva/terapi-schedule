/**
 * ***************************
 * @fileoverview App settings.
 * ***************************
 */

require('dotenv').config()

module.exports.config = {
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3000',
    dev: process.env.NODE_ENV !== 'production',
  },
  auth: {
    cookiAuthName: process.env.COOKIE_AUTH_NAME || 'TERAPIFY-AUTH-COOKIE',
    cookieAge: 1000 * 60 * 60 * 24 * 365, // One Year
    secret: process.env.JWT_SECRET || 'secret',
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    saltFactor: process.env.SALT_FACTOR || 10,
  },
  db: {
    uri: process.env.DB_URL,
  },
}
