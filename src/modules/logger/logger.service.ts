// Dependencies
import { Injectable, LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import * as winston from 'winston';

/**
 * Export my logger service
 *
 * @class MyLogger
 * @implements LoggerService
 * */
@Injectable()
export class MyLogger implements LoggerService {
  private readonly logger;

  private level = 'info';

  private context: string;

  private static LOGS_PATH = 'storage/logs';

  /**
   * @constructor
   * */
  constructor() {
    this.logger = (winston as any).createLogger(this.getLoggerOptions(this.level));
  }

  /**
   * @member getLoggerOptions
   *
   * @param {string} level
   *
   * @returns {winston.LoggerOptions}
   */
  getLoggerOptions(level: string): winston.LoggerOptions {
    return {
      level: level,
      transports: [
        new winston.transports.File({
          filename: `${MyLogger.LOGS_PATH}/${level}.log`,
        }),
      ],
    };
  }

  /**
   * @member setContext
   *
   * @param {string} context
   *
   * @returns {this}
   */
  setContext(context: string): this {
    this.context = context;

    return this;
  }

  /**
   * @member setLevel
   *
   * @param {string} level
   *
   * @returns {void}
   */
  setLevel(level: string): this {
    this.level = level;

    const loggerOptions = this.getLoggerOptions(level);
    this.overrideOptions(loggerOptions);

    return this;
  }

  /**
   * @member log
   *
   * @param {string} message
   *
   * @returns {void}
   */
  log(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });

    if (this.context !== 'TypeORMLogger') {
      this.logToConsole('info', message);
    }
  }

  /**
   * @member error
   *
   * @param {string} message
   * @param {string} trace
   *
   * @returns {void}
   */
  error(message: string, trace?: string): void {
    this.setLevel('error');
    const currentDate = new Date();
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('error', message);
  }

  /**
   * @member warn
   *
   * @param {string} message
   *
   * @returns {void}
   */
  warn(message: string): void {
    this.setLevel('warn');
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('warn', message);
  }

  /**
   * @member info
   *
   * @param {string} message
   *
   * @returns {void}
   */
  info(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('info', message);
  }

  /**
   * @member debug
   *
   * @param {string} message
   *
   * @returns {void}
   */
  debug(message: string): void {
    this.setLevel('debug');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('debug', message);
  }

  /**
   * @member overrideOptions
   *
   * @param {winston.LoggerOptions} options
   *
   * @returns {void}
   */
  overrideOptions(options: winston.LoggerOptions): void {
    this.logger.configure(options);
  }

  /**
   * this member just for printing a cool log in your terminal, using chalk
   *
   * @member logger
   *
   * @param {string} level
   * @param {string} message
   *
   * @returns {void}
   * */
  private logToConsole(level: string, message: string): void {
    let result;
    const color = chalk.default;
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    switch (level) {
      default:
      case 'info':
        result = `[${color.blue('INFO')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
      case 'error':
        result = `[${color.red('ERR')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
      case 'warn':
        result = `[${color.yellow('WARN')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
    }
    console.log(result);
  }
}
