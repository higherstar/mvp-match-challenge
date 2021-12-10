// Dependencies
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

// DTOs
import { FailedResponseDto } from '../shared/DTOs/failed-response.dto';

// Exceptions
import { ValidationException } from './validation.exception';

/**
 * Export validation filter
 *
 * @class ValidationFilter
 * @implements ExceptionFilter
 * */
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  /**
   * @member catch
   *
   * @param {ValidationException} exception
   * @param {ArgumentsHost} host
   *
   * @returns {void}
   * */
  catch(exception: ValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const resp: FailedResponseDto = {
      errorMessage: exception.message,
      errors: exception.validationErrors,
    };

    response.status(status).json(resp);
  }
}
