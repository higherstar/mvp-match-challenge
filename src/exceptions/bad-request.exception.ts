// Dependencies
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';

// Services
import { MyLogger } from '../modules/logger/logger.service';

// DTOs
import { FailedResponseDto } from '../shared/DTOs/failed-response.dto';

/**
 * Export bad request exception filter
 *
 * @class BadRequestExceptionFilter
 * @implements ExceptionFilter
 * */
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  /**
   * @member catch
   *
   * @param {BadRequestException} exception
   * @param {ArgumentsHost} host
   *
   * @returns {void}
   * */
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const logger = new MyLogger();
    logger.setContext('BadRequestException');
    logger.error(JSON.stringify(exception.message));

    const resp: FailedResponseDto = {
      errorMessage: exception.message,
    };

    response.status(status).json(resp);
  }
}
