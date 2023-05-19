/**
 * 需要输出三样东西：
 * 1. 使用@nestjs/config 将配置注册到命名空间中
 * 2. 输出一个配置的接口，有类型推测可以方便开发和定义标准
 * 3. 输出验证方式，针对无法设置默认值但有时必须有的配置信息，提醒开发者
 */

import { ConfigFactory, registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { IDbConfig } from 'src/interfaces/db.interface';

export type IMongoConfig = IDbConfig;

export class Mongo {
  // register(): void;
  static register(): ConfigFactory {
    return registerAs('mongo', (): IMongoConfig => {
      const options = {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || '27017',
        password: process.env.MONGO_PASSWORD,
        username: process.env.MONGO_USERNAME,
        db: process.env.MONGO_DB || 'stu_record',
      };
      const uri = `mongodb://${
        options.username && options.password
          ? options.username + ':' + options.password + '@'
          : ''
      }${options.host}:${options.port}/${options.db}`;
      return { options, uri: uri, db: options.db };
    });
  }
  static validation: Joi.ObjectSchema<any> = Joi.object({
    options: Joi.object({
      host: Joi.string().required().label('MongoDB主机'),
      port: Joi.number().min(1000).max(65535).required().label('MongoDB端口'),
      username: Joi.string().label('MongoDB账号名'),
      password: Joi.string().strip().label('MongoDB密码'),
      db: Joi.string().required().label('MongoDB数据库名称'),
    }),
    uri: Joi.string().required().label('MongoDB连接字'),
  });
}
