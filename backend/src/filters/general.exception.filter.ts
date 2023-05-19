import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ExceptionTemplate } from 'src/config/exception-template.constant';
import { GeneralException } from '.';

/**
 * 统一异常返回
 * @author Django 2022-06-05
 * @param resType 响应类型
 * @returns 异常过滤器
 */

@Catch(HttpException)
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(ex: GeneralException, host: ArgumentsHost): any {
    const logger = new Logger('Exception', { timestamp: true });

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    // console.log('exception:', typeof ex, ex.getStatus())

    logger.error(request.url, ex);
    logger.error(ex.stack || '无堆栈信息');

    const response = ctx.getResponse();
    response.status(ex.getStatus());

    // console.error('exception', ex)

    if (request.accept && request.accept.indexOf('html') > -1) {
      // 在渲染模板页面时出现异常，则定位到指定错误显示页面
      const request = ctx.getRequest();
      console.log('request:', request.url, ex.getStatus());
      const page = {
        path: request.url,
        message: ex.message,
        errCode: ex.errorCode || ex.getStatus(),
        timestamp: new Date().toISOString(),
      };
      response.render(ExceptionTemplate.get(ex.getStatus()), page);
    } else {
      // 采用JSON的方式返回类型，则必须使用通用的返回对象，由前端通信函数统一处理
      const result: any = {
        message: ex.message,
        errCode: ex.errorCode || ex.getStatus(),
      };
      response.json(result);
    }
  }
}
