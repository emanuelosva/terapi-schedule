/**
 * *****************************************
 * @fileoverview Not Found route middleware.
 * *****************************************
 */

const { httpErrors } = require('../lib/errorManager')

/**
 * Display a error response with 404 status
 * on not found route.
 * @param {Express.Request} req - request object
 * @param {Express.Response} res - response object
 */
const notFoundHandler = (req, res) => {
  res.status(httpErrors.notFound).json({
    error: true,
    detail: 'Not found',
  })
}

module.exports = {
  notFoundHandler,
}
