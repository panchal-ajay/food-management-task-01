/**
 * Sends a success response.
 * @param {Object} res - Express response object.
 * @param {string} message - Success message.
 * @param {Object} [data] - Optional data to send in the response.
 * @param {number} [statusCode=200] - HTTP status code.
 */
const successResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Sends an error response.
 * @param {Object} res - Express response object.
 * @param {HttpException} exception - The HttpException instance.
 */
const errorResponse = (res, exception) => {
  res.status(exception.statusCode).json({
    success: false,
    message: exception.message,
    error: exception.error,
    // timestamp: exception.timestamp,
  });
};


module.exports = {
  successResponse,
  errorResponse,
};
