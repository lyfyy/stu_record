import { HttpException } from '@nestjs/common';

/**
 * @author 郭世凯
 * @date 2022-03-29
 * 通用处理业务错误
 * 直接调用即可: ExceptionFilter会自动处理相关逻辑
 */

export class BusinessException extends HttpException {
  constructor(errCode: number, message: string, statusCode = 200) {
    super({ errCode, message }, statusCode);
  }
}
