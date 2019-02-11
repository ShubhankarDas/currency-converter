const winston = require('winston')

// Using winston for logging and storing in a local file

// -- Problems that could come up ---
// Missing out few transactions logs
// No logs once the memory is full

// -- Better approach  --
// We could use a third party logging system where we would just send the data and see them on their dashboard
// This would remove the overhead of maintaining the logging system


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