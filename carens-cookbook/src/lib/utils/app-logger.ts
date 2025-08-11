import winston, { format } from 'winston';

const level = process.env.LOG_LEVEL || 'info';

const baseFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaPayload = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}] ${message}${metaPayload}`;
  })
);

export const appLogger = winston.createLogger({
  level,
  format: baseFormat,
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), baseFormat),
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/app-error.log', level: 'error', maxsize: 5_242_880, maxFiles: 3 }),
          new winston.transports.File({ filename: 'logs/app-combined.log', maxsize: 5_242_880, maxFiles: 5 }),
        ]
      : []),
  ],
});


