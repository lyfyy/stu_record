import { INestApplication } from '@nestjs/common';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exception.filter';
import { UnauthorizedExceptionFilter } from 'src/filters/unauthorized-exception.filter';
import { GeneralExceptionFilter } from 'src/filters/general.exception.filter';

export async function nestSetup(app: INestApplication): Promise<void> {
  app.useGlobalFilters(new GeneralExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
}
