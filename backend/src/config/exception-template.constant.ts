/**
 * 异常发生时返回相对应的视图模板配置
 * @author Django 2022-06-05
 */

import { HttpStatus } from '@nestjs/common'

export const ExceptionTemplate: Map<number, string> = new Map<number, string>([
  [HttpStatus.UNAUTHORIZED, 'login'],
  [HttpStatus.NOT_FOUND, '404'],
  [HttpStatus.FORBIDDEN, 'login'],
  [HttpStatus.INTERNAL_SERVER_ERROR, '500']
])
