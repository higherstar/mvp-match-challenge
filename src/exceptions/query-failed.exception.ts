// Dependencies
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

// Services
import { MyLogger } from '../modules/logger/logger.service';

// Constants
import { PS_EXCEPTIONS } from '../shared/constants/postgres.constants';

// DTOs
import { FailedResponseDto } from '../shared/DTOs/failed-response.dto';

/**
 * @interface QueryFailedException
 * @implements Error
 * */
interface QueryFailedException extends Error {
  code: string;
  message: string;
}

/**
 * Export query failed exception filter
 *
 * @class QueryFailedExceptionFilter
 * @implements ExceptionFilter
 * */
@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  /**
   * @member catch
   *
   * @param {QueryFailedException} exception
   * @param {ArgumentsHost} host
   *
   * @returns {void}
   * */
  catch(exception: QueryFailedException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = 500;

    const errorType = PS_EXCEPTIONS[exception.code] || 'Internal Server Error';

    const logger = new MyLogger();
    logger.setContext('QueryFailedException');
    logger.error(JSON.stringify(exception.message));

    const resp: FailedResponseDto = {
      errorMessage: exception.message,
      errorType: errorType,
    };

    if (process.env.NODE_ENV !== 'production') {
      resp.errorMessage = exception.message;
    }

    response.status(statusCode).json(resp);
  }
}
