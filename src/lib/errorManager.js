/**
 * ***********************************
 * @fileoverview Error centralization.
 * ***********************************
 */

/**
 * Provide a interface of most common http status errors.
 */
const httpErrors = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
}

/**
 * ApiError - Inherit all native Error properties and
 * add http error information.
 */
class ApiError extends Error {
  /**
   * Raises a custom error that with aditional http parameters.
   * @param {string} message
   * @param {number} status
   * @param {boolean} isOperational
   */
  constructor(message, status, isOperational = false) {
    super()
    this.message = message
    this.status = status
    this.isOperational = isOperational
  }
}

/**
 * Helper to return trhow a new ApiError class.
 * @param {string} message - Error message
 * @param {string} status - HTTP status error
 */
const raiseError = (
  message = 'Server error',
  status = httpErrors.serverError
) => {
  return Promise.reject(new ApiError(message, status))
}

module.exports = {
  httpErrors,
  ApiError,
  raiseError,
}
