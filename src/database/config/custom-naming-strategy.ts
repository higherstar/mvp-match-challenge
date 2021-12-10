// Dependencies
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

/**
 * Export custom naming strategy
 *
 * @class CustomNamingStrategy
 * @extends DefaultNamingStrategy
 * @implements NamingStrategyInterface
 * */
export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  /**
   * Converts camelCase to under_score
   *
   * @param propertyName
   */
  columnName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}
