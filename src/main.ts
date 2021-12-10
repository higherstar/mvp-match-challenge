// Dependencies
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cors from 'cors';

// Modules
import { AppModule } from './app.module';

// Exceptions
import {
  BadRequestExceptionFilter,
  HttpExceptionFilter,
  QueryFailedExceptionFilter,
  ValidationException,
  ValidationFilter
} from './exceptions';

// Services
import { MyLogger } from './modules/logger/logger.service';
import { SwaggerService } from './swagger/swagger.service';

// Constants
import { API_PREFIX } from './shared/constants/global.constants';
import { SWAGGER_API_PATH } from './swagger/swagger.constants';

// Pipes
import { TrimBodyPipe } from './shared/pipes/dto-property.transformer';

// Interfaces
import { _INestApplication } from './shared/global.types';

// Helpers
import { mapErrorMessagesFromValidator } from './shared/helpers';

// Config
require('dotenv').config();

// Get port from env
const PORT = process.env.PORT;

/**
 * @function initApp
 * */
const initApp = async (): Promise<void> => {
  const app = (await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'warn'],
    bodyParser: true,
  })) as _INestApplication;

  app.enable('trust proxy');

  // TODO: add ldapauth middleware

  app.use(
    cors({
      // TODO: add CORS origin
      exposedHeaders: ['Content-Disposition'],
    }),
  );

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter(),
    new QueryFailedExceptionFilter(),
    new ValidationFilter(),
  );

  // TrimPipe should be before ValidationPipe, to provide trimmed values
  app.useGlobalPipes(
    new TrimBodyPipe(),
    new ValidationPipe({
      whitelist: true,
      validationError: { target: false },
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(errors.reduce(mapErrorMessagesFromValidator, {}));
      },
    }),
  );

  const swagger = await app.resolve(SwaggerService);
  swagger.prepareSwaggerOptions();
  const document = SwaggerModule.createDocument(app, swagger.swaggerOptions.build());
  SwaggerModule.setup(SWAGGER_API_PATH, app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.listen(PORT, async () => {
    const logger = await app.resolve(MyLogger);
    logger.setContext('Main');
    logger.log(`Server started listening on PORT: ${PORT}`);
  });
};

// initialize app
initApp();
