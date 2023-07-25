import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly debug: string = process.env.DEBUG;

  use(req: Request, res: Response, next: () => void) {
    const isDebug = this.debug === '1';

    console.log('REQUEST: Incoming request...');

    if (isDebug) {
      //This logic could be implement to send logs to third party
      const endpoint = req.url ?? 'NA';
      const method = req.method ?? 'NA';
      const queryParams = req.params ? JSON.stringify(req.params) : 'NA';
      const body = req.body ? JSON.stringify(req.body) : 'NA';

      console.log(`REQUEST: Endpoint ${endpoint}`);
      console.log(`REQUEST: Method ${method}`);
      console.log(`REQUEST: Query Params ${queryParams}`);
      console.log(`REQUEST: Body ${body}`);
    }

    next();
  }
}
