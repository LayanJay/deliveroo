import winston from 'winston';

export type logColorsType =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray';

export const logColors = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

export type logColorDoType =
  | 'reset'
  | 'bright'
  | 'dim'
  | 'underscore'
  | 'blink'
  | 'reverse'
  | 'hidden';

export const logColorDo = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
};

export const logColor = (text: string, color: logColorsType, type?: logColorDoType) => {
  if (!type) type = 'reset';

  return `${logColors[color]} ${text} ${logColorDo[type]}`;
};

const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
});

export default logger;
