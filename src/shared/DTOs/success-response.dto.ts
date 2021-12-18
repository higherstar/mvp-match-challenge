// DTOs
import { PaginationDto } from './pagination.dto';
import { SortOrderDto } from './sort-order.dto';

/**
 * Export basic patingation dto
 *
 * @class BasicPaginationDto
 * */
export class BasicPaginationDto {
  pagination?: PaginationDto;

  sortOrder?: SortOrderDto;
}

/**
 * Export basic success response dto
 *
 * @class BasicSuccessResponseDto
 * */
export class BasicSuccessResponseDto {
  message: string;
}

/**
 * Export success response dto
 *
 * @class BasicPaginationDto
 * */
export class SuccessResponseDto<T> extends BasicPaginationDto {
  message: string;

  data?: T;
}
