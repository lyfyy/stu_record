import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // return 'success';
    const mongoose = require('mongoose');
    try {
      const mongoInfo = mongoose.connection.readyState === 1;
      console.log('mongoInfo', mongoInfo);
      if (mongoInfo) {
        return 'success';
      } else {
        throw Error(`${mongoInfo ? '' : 'mongo '}数据库连接异常`);
      }
    } catch (err) {
      return 'error';
    }
  }
}
