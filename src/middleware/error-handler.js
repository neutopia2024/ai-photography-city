const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error: ${message}`, {
    status,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(status).json({
    error: message,
    status
  });
};

module.exports = errorHandler;