/**
 * ************************************************
 * @fileoverview JS Docs for Swagger documentation.
 * ************************************************
 */

/**
 * @typedef Success
 * @property {string} detail.required - Operation message - eg: Operation successful
 */

/**
 * @typedef BadRequest
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Invalid request info
 */

/**
 * @typedef Unauthorized
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Invalid credentials
 */

/**
 * @typedef Forbidden
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Forbidden
 */

/**
 * @typedef NotFound
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Not Found
 */

/**
 * @typedef Conflict
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Conflict with preexisting data
 */

/**
 * @typedef ServerError
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Server error
 */
