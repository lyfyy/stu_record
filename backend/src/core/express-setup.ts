import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { IMongoConfig } from 'src/config';

import { join, resolve } from 'path';

export async function expressSetup(app: NestExpressApplication): Promise<void> {
  const mongo = app.get(ConfigService).get<IMongoConfig>('mongo');
  console.log('mongo', mongo);
  app.use(compression());
  // 优先处理json，没有合适的xml for express的转换器，所以将文本类型都处理成text
  // 其他的作为二进制处理
  app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }));
  app.use(bodyParser.text({ type: 'text/*', limit: '10mb' }));
  // app.use(bodyParser.raw({ type: '*/*', limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  // app.useStaticAssets(env.staticDir);
  app.useStaticAssets(resolve(join(__dirname, '../../public')));
  // 根目录
  app.setGlobalPrefix('/');
  mongoose.connect('mongodb://localhost:27017/stu-record');
  app.disable('x-powered-by');
}
