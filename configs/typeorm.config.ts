// typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'sunj5540',
  database: 'tennisLesson',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};