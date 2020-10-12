/**
 * ***********************************************
 * @fileoverview Authentication and authorization.
 * ***********************************************
 */

module.exports.jwt = require('./jwt')
module.exports.scopes = require('./scopes')
module.exports.setResponseCookie = require('./setCookie').setResponseCookie
module.exports.cookieAuthenticate = require('./cookie.auth').cookieAuthenticate
