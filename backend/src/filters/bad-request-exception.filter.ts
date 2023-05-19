import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): any {
    const logger = new Logger('Exception', { timestamp: true });

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 400;
    // console.log('bad-request exception', exception)
    logger.error(request.url, exception);
    logger.error(exception.stack || '无堆栈信息');
    const message = exception.message || '参数错误';
    const error = {
      status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(status).json(error);
  }
}
