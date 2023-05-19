import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressSetup, nestSetup } from './core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
  });
  await app.init();
  app.enableCors();
  await app.listen(3000);

  await expressSetup(app);
  await nestSetup(app);
}

bootstrap();
