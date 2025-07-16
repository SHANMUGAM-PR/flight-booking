class AppError extends Error {
  constructor(message, statusCode, error = {}) {
    super(message); // Sets this.message and captures stack
    this.name = this.constructor.name; // Sets name to 'AppError'
    this.statusCode = statusCode;
    this.success = false;
    this.data = null; // More standard than {}
    this.error = error;

    Error.captureStackTrace(this, this.constructor); // Clean stack trace
  }
}

module.exports = AppError;
