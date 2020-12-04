import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule, utilities as nestWinstonUtils } from 'nest-winston';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import loggerConfig from './config/logger';

@Module({
  imports: [WinstonModule.forRoot(loggerConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
