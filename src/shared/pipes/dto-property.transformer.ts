// Dependencies
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectType } from 'typeorm';

/**
 * Export trim body pipe
 *
 * @class TrimBodyPipe
 * @implements PipeTransform
 * */
@Injectable()
export class TrimBodyPipe implements PipeTransform {
  /**
   * @member transform
   *
   * @param {T} requestParams,
   * @param {ArgumentMetadata} type
   *
   * @returns {T}
   * */
  transform<T>(requestParams: T, { type }: ArgumentMetadata): T {
    if (!type || type !== 'body') {
      return requestParams;
    }

    const trimValues = (acc: ObjectType<T>, [key, value]: [string, any]) => ({
      ...acc,
      [key]: typeof value === 'string' ? value.trim() : value,
    });

    return Object.entries(requestParams).reduce(trimValues, {} as { [key: string]: any }) as T;
  }
}
