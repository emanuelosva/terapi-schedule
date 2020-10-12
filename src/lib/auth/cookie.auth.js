/**
 * ***************************************
 * @fileoverview Cookie auth strategy.
 *
 * @description Get token from request and
 * verify if is valid. If true, the token
 * id used to retrieve the current user
 * info.
 * ***************************************
 */

const passport = require('passport')
const CookieStrategy = require('passport-cookie')
const { verifyAndDecodeToken } = require('./jwt')
const { ApiError, httpErrors } = require('../errorManager')
const { CRUD } = require('../db')
const { config } = require('../../config')

passport.use(
  new CookieStrategy(
    {
      cookieName: config.auth.cookiAuthName,
      signed: false,
    },
    async (token, done) => {
      const authError = new ApiError(
        'Invalid credentials',
        httpErrors.unauthorized
      )
      const db = new CRUD()
      try {
        const { email, scope } = verifyAndDecodeToken(token)
        if (!email || !scope) return done(authError)
        const user = await db.getUser({ query: { email }, scope })
        if (!user) return done(authError)
        return done(null, user)
      } catch (error) {
        return done(authError)
      }
    }
  )
)
