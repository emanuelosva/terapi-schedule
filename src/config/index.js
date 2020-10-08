/**
 * ***************************
 * @fileoverview App settings.
 * ***************************
 */

require('dotenv').config()

module.exports.config = {
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  auth: {
    cookiAuthName: process.env.COOKIE_AUTH_NAME || 'TERAPIFY-AUTH-COOKIE',
    secret: process.env.JWT_SECRET || 'secret',
  },
}
