// Dependencies
import { Injectable, Scope } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

// Swagger constants
import { SWAGGER_DESCRIPTION, SWAGGER_TITLE, SWAGGER_VERSION } from './swagger.constants';

/**
 * Export swagger service
 *
 * @class SwaggerService
 * */
@Injectable({ scope: Scope.TRANSIENT })
export class SwaggerService {
  /** @var DocumentBuilder swaggerOptions */
  swaggerOptions;

  /**
   * @member prepareSwaggerOptions
   *
   * @returns {void}
   */
  prepareSwaggerOptions(): void {
    this.swaggerOptions = new DocumentBuilder()
      .setTitle(SWAGGER_TITLE)
      .setDescription(SWAGGER_DESCRIPTION)
      .setVersion(SWAGGER_VERSION)
      .addBearerAuth();

    this.swaggerOptions.build();
  }
}
