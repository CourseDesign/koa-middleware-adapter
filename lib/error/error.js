class Error {
  constructor({ statusCode = 500, message = '' }) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = Error;
