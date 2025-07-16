const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',  // minimum level to log
  format: combine(
    colorize(),     // adds color in console
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new transports.Console(), // log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // log errors to file
    new transports.File({ filename: 'logs/combined.log' })  // log all levels to file
  ],
});

module.exports = logger;
