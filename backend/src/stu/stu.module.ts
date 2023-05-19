import { Module } from '@nestjs/common';
import { StuService } from './stu.service';
import { StuController } from './stu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StuSchema } from 'src/schemas/stu.schema';
import { stuProviders } from 'src/providers/stuRecord.provider';
import { MongoProviders } from 'src/providers/mongo.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: StuSchema }])],
  providers: [StuService, ...stuProviders, ...MongoProviders],
  controllers: [StuController],
})
export class StuModule {}
