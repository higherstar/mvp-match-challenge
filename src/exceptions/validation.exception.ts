// Dependencies
import { BadRequestException } from '@nestjs/common';

/**
 * @interface ValidationError
 * */
export interface ValidationError {
  [key: string]: ValidationError | string[];
}

/**
 * Export validation exception
 *
 * @class ValidationException
 * @extends BadRequestException
 * */
export class ValidationException extends BadRequestException {
  /**
   * @constructor
   *
   * @param {ValidationError} validationErrors
   * */
  constructor(public validationErrors: ValidationError) {
    super();
  }
}
