// Dependencies
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';

/**
 * @interface EntityExistValidationArguments
 * @extends ValidationArguments
 * */
interface EntityExistValidationArguments<T> extends ValidationArguments {
  constraints: [
    ObjectType<T> | EntitySchema<T> | string,
    ((validationArguments: ValidationArguments) => FindConditions<T>) | keyof T,
  ];
}

/**
 * Export entity exist validator
 *
 * @class EntityExistValidator
 * @implements ValidatorConstraintInterface
 * */
@ValidatorConstraint({ name: 'entityExist', async: false })
@Injectable()
export class EntityExistValidator implements ValidatorConstraintInterface {
  /**
   * @constructor
   *
   * @param connection
   * */
  constructor(@InjectConnection() protected readonly connection: Connection) {}

  /**
   * @member validate
   *
   * @param {string} value
   * @param {EntityExistValidationArguments<T>} args
   *
   * @returns {Promise<boolean>}
   * */
  async validate<T>(value: string, args: EntityExistValidationArguments<T>): Promise<boolean> {
    if (!value) {
      return false;
    }

    const [EntityClass, fieldName] = args.constraints;
    const entityOccurrence = await this.connection.getRepository(EntityClass).count({
      where: { [`${fieldName}`]: value },
    });

    return !!entityOccurrence;
  }
}
