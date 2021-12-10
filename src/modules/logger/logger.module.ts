// Dependencies
import { Module } from '@nestjs/common';

import { MyLogger } from './logger.service';

/**
 * Export logger module
 *
 * @module LoggerModule
 * */
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
