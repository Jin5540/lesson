import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSeeder } from './dataSeeder'; 

async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(DataSeeder);
  await seeder.seed();
  await app.close();
}

runSeeder();
