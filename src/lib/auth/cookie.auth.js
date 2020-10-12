/**
 * ***************************************
 * @fileoverview Cookie auth strategy.
 *
 * @description Get token from request and
 * verify if is valid. If true, the token
 * is used to retrieve the current user
 * info.
 * ***************************************
 */

const { verifyAndDecodeToken } = require('./jwt')
const { ApiError, httpErrors } = require('../errorManager')
const { CRUD } = require('../db')
const { config } = require('../../config')

const unauthorizedError = () => {
  return new ApiError('Invalid credentials', httpErrors.unauthorized)
}

/**
 * Cookie authentication strategy.
 * @param {array} scopes - The permited scopes access
 */
const cookieAuthenticate = ({ scopes }) => {
  return async (req, res, next) => {
    const cookieAuthToken = req.cookies[config.auth.cookiAuthName]
    if (!cookieAuthToken) return next(unauthorizedError())

    try {
      const { email, scope } = verifyAndDecodeToken(cookieAuthToken)

      if (!scopes.includes(scope)) {
        return next(new ApiError('Forbidden', httpErrors.forbidden))
      }

      const db = new CRUD()
      const user = await db.getUser({ query: { email }, scope })
      if (!user) return next(unauthorizedError())

      req.user = user
      return next()
    } catch (error) {
      req.user = null
      return next(unauthorizedError())
    }
  }
}

module.exports = {
  cookieAuthenticate,
}
