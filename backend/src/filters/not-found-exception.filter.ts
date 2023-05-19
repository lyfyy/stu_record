import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 404;
    // console.log('not-found exception', exception)
    const message = exception.message || 'Not Found';
    const error = {
      status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(status).json(error);
  }
}
