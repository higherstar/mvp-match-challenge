import { PaginationDto } from './pagination.dto';
import { SortOrderDto } from './sort-order.dto';

export class BasicPaginationDto {
  pagination?: PaginationDto;

  sortOrder?: SortOrderDto;
}

export class BasicSuccessResponseDto {
  message: string;
}

export class SuccessResponseDto<T> extends BasicPaginationDto {
  message: string;

  data?: T;
}
