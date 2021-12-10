// Dependencies
import { ValidationError } from '@nestjs/common';

// Exceptions
import { ValidationError as CustomValidationError } from '../exceptions';

/**
 * Map error messages from validator
 *
 * @param {CustomValidationError} messages
 * @param {ValidationError} error
 * */
export const mapErrorMessagesFromValidator = (
  messages: CustomValidationError,
  error: ValidationError,
): CustomValidationError => ({
  ...messages,
  [error.property]:
    error.constraints || !error.children || error.children.length === 0
      ? Object.values(error.constraints || [])
      : error.children.reduce(mapErrorMessagesFromValidator, {}),
});
