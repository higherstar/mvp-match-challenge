// Dependencies
import { ValidationError } from '@nestjs/common';

// Exceptions
import { ValidationError as CustomValidationError } from '../exceptions';
import { DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT } from './constants/global.constants';

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

export const transformLimit = (limit): number => {
  limit = Number(limit);
  if (isNaN(limit) || limit <= 0 || limit > MAX_PAGE_LIMIT) {
    limit = DEFAULT_PAGE_LIMIT;
  }

  return limit;
};

export const transformPage = (page): number => {
  page = Number(page);
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  return page;
};
