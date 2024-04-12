import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonSearchRepository } from './repository/lessonSearchRepository.repository'
import { Lesson } from './entity/lesson.entity';
import { Court } from './entity/court.entity';
import { Coach } from './entity/coach.entity';
import { LessonApplyRepository } from './repository/lessonApplyRepository.repository';
import { ScheduleRepository } from './repository/scheduleRepository.repository';
import { User } from './entity/user.entity';
import { Schedule } from './entity/schedule.entity';
import { DayOfWeek } from './entity/DayOfweek.entity';
import { LessonTime } from './entity/lessonTime.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Lesson, Court, Coach, User, Schedule, DayOfWeek, LessonTime])
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonSearchRepository, LessonApplyRepository, ScheduleRepository]
})
export class LessonModule {}
