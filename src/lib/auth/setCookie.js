/**
 * **********************************
 * @fileoverview Set response cookie.
 * **********************************
 */

const { config } = require('../../config')

/**
 * Set a response cookie in express response object
 * @param {} res - Response object
 * @param {} token - The cookie token
 */
const setResponseCookie = ({ res, token }) => {
  res.cookie(config.auth.cookiAuthName, token, {
    httpOnly: !config.app.dev,
    secure: !config.app.dev,
    maxAge: config.auth.cookieAge,
  })
}

module.exports = {
  setResponseCookie,
}
