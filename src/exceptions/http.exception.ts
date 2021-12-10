// Dependencies
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

// Services
import { MyLogger } from '../modules/logger/logger.service';

// DTOs
import { FailedResponseDto } from '../shared/DTOs/failed-response.dto';

/**
 * Export http exception filter
 *
 * @class HttpExceptionFilter
 * @implements ExceptionFilter
 * */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @member catch
   *
   * @param {HttpException} exception
   * @param {ArgumentsHost} host
   *
   * @returns {void}
   * */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const logger = new MyLogger();
    logger.setContext('HttpException');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    logger.error(JSON.stringify(exception.message));
    const resp: FailedResponseDto = {
      errorMessage: exception.message,
    };

    response.status(status).json(resp);
  }
}
