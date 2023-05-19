import { HttpException } from '@nestjs/common';

/**
 * 一般异常类
 * @author Django 2022-06-05
 */
export class GeneralException extends HttpException {
  constructor(
    status: number,
    public errorCode: number,
    description = 'General Exception',
    objectOrError?: string | any,
  ) {
    super(HttpException.createBody(objectOrError, description), status);
  }
}

export enum ExceptionResponseType {
  TEMPLATE,
  JSON,
  XML,
}
