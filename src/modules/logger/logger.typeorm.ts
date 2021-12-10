// Dependencies
import { Logger } from 'typeorm';

// Config
import { LOGGING_LEVELS } from '../../database/config';

// Service
import { MyLogger } from './logger.service';

/**
 * Export type orm logger
 *
 * @class TypeORMLogger
 * @implements Logger
 * */
export class TypeORMLogger implements Logger {
  /**
   *  @var logger
   *  */
  private logger;

  /**
   * @constructor
   * */
  constructor() {
    this.logger = new MyLogger();
    this.logger.setContext('TypeORMLogger');
  }

  /**
   * @member logQuery
   *
   * @param {string} query
   * @param {any[]} parameters
   *
   * @returns {any}
   */
  logQuery(query: string, parameters?: any[]): any {
    if (LOGGING_LEVELS.includes('query')) {
      this.logger.debug(`${query}, ${parameters}`);
    }
  }

  /**
   * @member log
   *
   * @param {"log" | "info" | "warn"} level
   * @param {string} message
   *
   * @returns {any}
   */
  log(level: 'log' | 'info' | 'warn', message: string): any {
    this.logger.log(message, level);
  }

  /**
   * @member logQueryError
   *
   * @param {string} error
   * @param {string} query
   * @param {any[]} parameters
   *
   * @returns {any}
   */
  logQueryError(error: string, query: string, parameters?: any[]): any {
    this.logger.error(`${error}, ${query}, ${parameters}`);
  }

  /**
   * @member logQuerySlow
   *
   * @param {number} time
   * @param {string} query
   * @param {any[]} parameters
   *
   * @returns {any}
   */
  logQuerySlow(time: number, query: string, parameters?: any[]): any {
    this.logger.info(`${time}, ${query}, ${parameters}`);
  }

  /**
   * @member logMigration
   *
   * @param {string} message
   *
   * @returns {any}
   */
  logMigration(message: string): any {
    this.logger.info(message);
  }

  /**
   * @member logSchemaBuild
   *
   * @param {string} message
   *
   * @returns {any}
   */
  logSchemaBuild(message: string): any {
    this.logger.info(message);
  }
}
