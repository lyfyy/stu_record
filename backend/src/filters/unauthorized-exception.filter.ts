import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): any {
    const logger = new Logger('Exception', { timestamp: true });
    logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 401;
    const message = exception.message || '账号存在异常';
    // console.error('unauthorized exception', exception)
    const error = {
      status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(status).json(error);
  }
}
