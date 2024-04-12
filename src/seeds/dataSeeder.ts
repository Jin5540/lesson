import { Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { Lesson } from '../lesson/entity/lesson.entity';
import { Court } from '../lesson/entity/court.entity';
import { Coach } from '../lesson/entity/coach.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalDateTime, Instant, ZoneOffset } from 'js-joda';
import { DateTimeFormatter as JSJodaDateTimeFormatter } from 'js-joda';
import { scheduled } from 'rxjs';
import { Schedule } from 'src/lesson/entity/schedule.entity';
import { DayOfWeek } from 'src/lesson/entity/DayOfweek.entity';
import { LessonTime } from 'src/lesson/entity/lessonTime.entity';
import { User } from 'src/lesson/entity/user.entity';

@Injectable()
export class DataSeeder implements Seeder {

  drop(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>,
    @InjectRepository(Coach)
    private readonly coachRepository: Repository<Coach>,
    @InjectRepository(Lesson)
    private readonly LessonSearchRepository: Repository<Lesson>,
    @InjectRepository(Schedule)
    private readonly ScheduleRepository: Repository<Schedule>,
    @InjectRepository(DayOfWeek)
    private readonly DayRepository: Repository<DayOfWeek>,
    @InjectRepository(LessonTime)
    private readonly TimeRepository: Repository<LessonTime>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async seed() {
    const dateNow = await this.localDateTime();
    await this.seedCourts();
    await this.seedCoachs();
    await this.seedDay();
    await this.seedTime();
    await this.seedUsers();
    //console.log(this.TwoDaysLaterDate(7, dateNow));
    //await this.seedLesson();

    console.log("데이터 저장 완료");
  }

  async localDateTime(){
    return LocalDateTime.now();
  }

  async correntDate() : Promise<Date>{
    const dateNow= LocalDateTime.now();
    const formattedDate = dateNow.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
    return new Date(formattedDate);
  }

  async random() : Promise<number>{
    return Math.floor(Math.random() * (22 - 7 + 1)) + 7; 
  }

  async TwoDaysLaterDate(randomNum : number, dateNow : LocalDateTime) : Promise<Date>{
    const nextDayAtSeven = dateNow.withHour(randomNum).withMinute(0).withSecond(0).withNano(0);
    const nextDay = nextDayAtSeven.plusDays(2);
    const formattedDate = nextDay.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
    
    return new Date(formattedDate);
  }

  async TwoDaysLaterDateH(randomNum : number, dateNow : LocalDateTime) : Promise<Date>{
    const nextDayAtSeven = dateNow.withHour(randomNum).withMinute(0).withSecond(0).withNano(0);
    const nextDay = nextDayAtSeven.plusDays(2).plusHours(1);
    const formattedDate = nextDay.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
    
    return new Date(formattedDate);
  }

  async ThreeDaysLaterDate(randomNum : number, dateNow : LocalDateTime) : Promise<Date>{
    const nextDayAtSeven = dateNow.withHour(randomNum).withMinute(0).withSecond(0).withNano(0);
    const nextDay = nextDayAtSeven.plusDays(3);
    const formattedDate = nextDay.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
    
    return new Date(formattedDate);
  }

  async ThreeDaysLaterDateH(randomNum : number, dateNow : LocalDateTime) : Promise<Date>{
    const nextDayAtSeven = dateNow.withHour(randomNum).withMinute(0).withSecond(0).withNano(0);
    const nextDay = nextDayAtSeven.plusDays(3).plusHours(1);
    const formattedDate = nextDay.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
    
    return new Date(formattedDate);
  }

  async FourDaysLaterDate(randomNum : number, dateNow : LocalDateTime) : Promise<Date>{
    const nextDayAtSeven = dateNow.withHour(randomNum).withMinute(0).withSecond(0).withNano(0);
    const nextDay = nextDayAtSeven.plusDays(4);
    const formattedDate = nextDay.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
    
    return new Date(formattedDate);
  }

  async FourDaysLaterDateH(randomNum : number, dateNow : LocalDateTime) : Promise<Date>{
    const nextDayAtSeven = dateNow.withHour(randomNum).withMinute(0).withSecond(0).withNano(0);
    const nextDay = nextDayAtSeven.plusDays(4).plusHours(1);
    const formattedDate = nextDay.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
    
    return new Date(formattedDate);
  }

  async seedCourts() {
    const currentDate: Date = await this.correntDate();
    for(let i=1; i<5; i++){
      const courtData = 
        { courtNumber: i,
          createAt : currentDate
        }
      await this.courtRepository.save(courtData);
    }
  }

  async seedCoachs() {
      const coachList = ['김민준', '오서준', '이도윤', '박예준']; 
      const currentDate: Date = await this.correntDate();
      for (const coach of coachList) {
        const coachData = 
        { name: coach,
          createAt : currentDate
        }
        await this.coachRepository.save(coachData);
      }
  }

  async seedUsers() {
    const info = ['소나무', '010-7777-7777', '감나무', '010-2222-3333', '참다래', '010-6666-1111']; 
    const currentDate: Date = await this.correntDate();
    for(let i=1; i<(info.length/2)+1; i++){
      const userData = 
      { 
        userName: info[2*i-2],
        userPhone: info[2*i-1],
        createAt : currentDate
      }
      await this.UserRepository.insert(userData);
    }

  }

  async seedDay() {
    const dayList = ['일', '월', '화', '수', '목', '금', '토']; 
    for (const d of dayList) {
      const dayData = 
      { 
        day: d
      }
      await this.DayRepository.save(dayData);
    }
  }

  async seedTime() {
    const timeList = ['00','30']; 
    let timeData;
    for (let i=7; i<24; i++) {
      for(let tt of timeList){
        const time = i+tt+':00'
        timeData = 
        { 
          time: time
        }
      }

      await this.TimeRepository.save(timeData);
    }
  }

  async seedLesson() {

    // 코치와 코트 정보를 가져옴 (예시로 첫 번째 코치와 코트를 가져옴)
    const coach = await this.coachRepository.findOne({ where: { id: 1 } });
    const court = await this.courtRepository.findOne({ where: { id: 1 } });
    const currentDate: Date = await this.correntDate();
    const ramdom = Math.random().toString(36).slice(2).substr(2, 5);
    const schedule = new Schedule(); 

    for(let i = 0; i < 15; i=i+3){

      const lesson = new Lesson();
      const randomNum = await this.random();
      const dateNow = await this.localDateTime();
      
      schedule.startTime = await this.TwoDaysLaterDate(i+7, dateNow);
      
      schedule.endTime = await this.TwoDaysLaterDateH(i+7, dateNow);
      schedule.createAt = currentDate;
      schedule.updateAt = currentDate;
      schedule.coach = coach;
      schedule.court = court;
      await this.ScheduleRepository.save(schedule);
    }

    for(let i = 0; i < 15; i=i+3){
      const lesson = new Lesson();
      const randomNum = await this.random();
      const dateNow = await this.localDateTime();
      
      schedule.startTime = await this.ThreeDaysLaterDate(i+7, dateNow);
      schedule.endTime = await this.ThreeDaysLaterDateH(i+7, dateNow);
      schedule.createAt = currentDate;
      schedule.updateAt = currentDate;
      schedule.coach = coach;
      schedule.court = court;
      await this.ScheduleRepository.save(schedule);
    }

    for(let i = 0; i < 15; i=i+3){
      const lesson = new Lesson();
      const randomNum = await this.random();
      const dateNow = await this.localDateTime();
      
      schedule.startTime = await this.FourDaysLaterDate(i+7, dateNow);
      schedule.endTime = await this.FourDaysLaterDateH(i+7, dateNow);
      schedule.createAt = currentDate;
      schedule.updateAt = currentDate;
      schedule.coach = coach;
      schedule.court = court;
      await this.ScheduleRepository.save(schedule);
    }
  }
}
  