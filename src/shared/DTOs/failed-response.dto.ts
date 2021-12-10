// Exceptions
import { ValidationError } from '../../exceptions';

/**
 * @class FailedResponseDto
 * */
export class FailedResponseDto {
  errorType?: string;
  errorMessage: string;
  errors?: ValidationError;
}
