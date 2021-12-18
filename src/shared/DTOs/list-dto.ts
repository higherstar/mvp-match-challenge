// DTOs
import { BasicPaginationDto } from './success-response.dto';

/**
 * @class ListDto<T>
 * @extends BasicPaginationDto
 * */
export class ListDto<T> extends BasicPaginationDto {
  listData: T[];
}
