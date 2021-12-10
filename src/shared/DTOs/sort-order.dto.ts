// Dependencies
import { IsOptional } from 'class-validator';

// Constants
import { OrderDirection, DEFAULT_SORT_BY } from '../constants/global.constants';


/**
 * Export sort order dto
 *
 * @class SortOrderDto
 * */
export class SortOrderDto {
  @IsOptional()
  order?: OrderDirection = OrderDirection.DESC;

  @IsOptional()
  sortBy?: string = DEFAULT_SORT_BY;
}
