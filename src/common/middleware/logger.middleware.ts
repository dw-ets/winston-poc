import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      console.log('##### Middleware: Request Finished. #####');
      const { query, params, method, hostname, url } = req;
      const { statusCode, statusMessage } = res;
      const contentType = res.get('Content-Type');
      const contentLength = res.get('Content-Length');

      const logMessage = `${method} ${url} -> ${statusCode} ${statusMessage}`;
      const logDetails = {
        request: {
          method,
          hostname,
          url,
          query,
          params,
        },
        response: {
          statusCode,
          statusMessage,
          contentType,
          contentLength,
        },
        timestamp: new Date().toISOString(),
      };

      this.logger.log({
        level: statusCode >= 400 ? 'error' : 'info',
        message: logMessage,
        details: logDetails,
      });
    });
    next();
  }
}
