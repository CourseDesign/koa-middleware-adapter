class Error {
  constructor({ status = 500, message = '' }) {
    this.status = status;
    this.message = message;
  }
}

module.exports = Error;
