/**
 * ***********************************
 * @fileoverview Authorization scopes.
 * ***********************************
 */

const jwt = require('jsonwebtoken')
const { config } = require('../../config')

/**
 * Create a signed token with passed payload.
 * @param {object} payload - The payload to encode.
 * @param {string} payload.email - The email of user.
 * @param {string} payload.scope - The user scope.
 */
const signToken = ({ email, scope }) => {
  return jwt.sign({ email, scope }, config.auth.secret, {
    algorithm: config.auth.algorithm,
  })
}

/**
 * Verify if the token is valid and return the decoded payload.
 * @param {string} token - The encoded token.
 */
const verifyAndDecodeToken = (token) => {
  return jwt.verify(token, config.auth.secret, {
    algorithms: [config.auth.algorithm],
  })
}

module.exports = {
  signToken,
  verifyAndDecodeToken,
}
