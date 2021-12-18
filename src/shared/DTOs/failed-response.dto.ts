// Exceptions
import { ValidationError } from '../../exceptions';

/**
 * Export failed response
 *
 * @class FailedResponseDto
 * */
export class FailedResponseDto {
  errorType?: string;
  errorMessage: string;
  errors?: ValidationError;
}
