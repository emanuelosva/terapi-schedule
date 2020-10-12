/**
 * ******************************
 * @fileoverview Swagger Service.
 * ******************************
 */

const expressSwagger = require('express-swagger-generator')
const { config } = require('../config')

/**
 * Return the current swagger host.
 */
const getSwaggerHost = () => {
  let host
  config.app.dev
    ? (host = `${config.app.host}:${config.app.port}`)
    : (host = config.app.host)
  return host
}

/**
 * General swagger settings
 */
const swaggerConf = {
  swaggerDefinition: {
    info: {
      title: 'Terapi Schedule',
      version: '1.0.0',
      description: 'REST API to handle Terapify agenda.',
    },
    host: getSwaggerHost(),
    basePath: '/api',
    produces: ['application/json'],
    schemes: config.app.dev ? ['http'] : ['https'],
    securityDefinitions: {
      COOKIE: {
        type: 'apiKey',
        in: 'cookie',
        name: config.auth.cookiAuthName,
        description: 'JWT cookie client session authentication.',
      },
    },
  },
  //Path to the API docs
  basedir: `${__dirname}/..`,
  files: ['./components/**/*.js', './components/*.js'],
}

/**
 * Generates a swagger json file and create
 * the ui-swagger service on `host/api-docs`
 * @param {express.Application} app
 */
const swaggerServer = (app) => {
  const swaggerService = expressSwagger(app)
  swaggerService(swaggerConf)
}

module.exports = {
  swaggerServer,
}
