import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpException =
      exception instanceof HttpException ? <HttpException>exception : null;
    const axiosError =
      exception instanceof AxiosError ? <AxiosError>exception : null;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    if (httpException) {
      statusCode = httpException.getStatus();
    } else if (axiosError && axiosError.response?.status) {
      statusCode = axiosError.response?.status;
    }

    const ErrorResponse: any = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message: exception?.message,
      response: axiosError
        ? axiosError.response?.data
        : httpException?.getResponse(), //TODO: Could add an environment variable to turn on and off.
    };

    this.logger.log(
      `request method: ${request.method}, request url: ${request.url}`,
      JSON.stringify(ErrorResponse),
    );
    response.status(statusCode).json(ErrorResponse);
  }
}
