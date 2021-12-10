// Dependencies
import { INestApplication } from '@nestjs/common';

/**
 * @interface _INestApplication
 * @extends INestApplication
 * */
export interface _INestApplication extends INestApplication {
  enable: (str: string) => void;
}
