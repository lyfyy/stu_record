import { Connection } from 'mongoose';
import { StuSchema } from 'src/schemas/stu.schema';

export const stuProviders = [
  {
    provide: 'stuModel',
    useFactory: (connection: Connection) =>
      connection.model('StuRecord', StuSchema),
    inject: ['mongoConnection'],
  },
];
