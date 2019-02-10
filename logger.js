const winston = require('winston')

// Logger level is 'info'
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()),
  transports: [
    new winston.transports.File({
      // filename for storing the log
      filename: 'accessLogs/transactions.log'
    }),
    new winston.transports.Console({
      level: 'debug'
    })
  ],
  exitOnError: false
});

module.exports = logger