import * as mongoose from 'mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const MongoProviders = [
  {
    imports: [ConfigModule],
    provide: 'mongoConnection',
    useFactory: async (config: ConfigService) =>
      await mongoose.connect('mongodb://localhost:27017/stu-record'),
    inject: [ConfigService],
  },
];
