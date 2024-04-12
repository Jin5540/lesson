import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonModule } from './lesson/lesson.module';
import { typeOrmConfig } from '../configs/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSeeder } from './seeds/dataSeeder'
import { Coach } from '../src/lesson/entity/coach.entity'
import { Court } from '../src/lesson/entity/court.entity'
import { Lesson } from './lesson/entity/lesson.entity';
import { User } from './lesson/entity/user.entity';
import { Schedule } from './lesson/entity/schedule.entity';
import { DayOfWeek } from './lesson/entity/DayOfweek.entity';
import { LessonTime } from './lesson/entity/lessonTime.entity';

@Module({
  imports: [LessonModule, TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([Court, Coach, Lesson, User, Schedule, DayOfWeek, LessonTime]),], 
  controllers: [AppController],
  providers: [AppService, DataSeeder],
})
export class AppModule {}
