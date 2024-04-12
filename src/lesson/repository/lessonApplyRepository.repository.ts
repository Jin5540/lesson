import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Coach } from "../entity/coach.entity";
import { Lesson } from "../entity/lesson.entity";
import { LessonDto } from "../dto/lesson.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Court } from "../entity/court.entity";
import * as bcrypt from 'bcrypt';
import { DayOfWeek } from "../entity/DayOfweek.entity";
import { LessonTime } from "../entity/lessonTime.entity";
import { Schedule } from "../entity/schedule.entity";
import { createCipheriv, randomBytes } from "crypto";
import { use } from "js-joda";

@Injectable()
export class LessonApplyRepository extends Repository<Lesson> {
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = randomBytes(32); // 256 bits
    private readonly iv = randomBytes(16); // 128 bits

    
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Coach)
        private readonly coachRepository: Repository<Coach>,
        @InjectRepository(Court)
        private readonly courtRepository: Repository<Court>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(DayOfWeek)
        private readonly DayRepository: Repository<DayOfWeek>,
        @InjectRepository(LessonTime)
        private readonly TimeRepository: Repository<LessonTime>,
        @InjectRepository(Schedule)
        private readonly ScheduleRepository: Repository<Schedule>,
    ) {
        super(Lesson, dataSource.createEntityManager());
    }

    async isLessonScheduledAtCourt(startAt: Date, endAt: Date) {
        let isLessonScheduled = false; // 전체 코트에 대한 예약 상태 변수 초기화
        let courtNum ;
        let court;
        console.log(startAt,endAt);
        const courtCount = await this.courtRepository.createQueryBuilder("court").getCount();
        // 모든 코트에 대해 루프를 돌면서 예약 상태 확인
        for(let i = 0 ; i < courtCount ; i++){
            court = await this.courtRepository.findOne({ where: { courtNumber : i+1 } });
            const scheduledLessons = await this.ScheduleRepository
                .createQueryBuilder("schedule")
                .where("schedule.court = :court", { court: i+1 })
                .andWhere("schedule.startTime BETWEEN :startAt AND :endAt", { startAt, endAt })
                .orderBy("schedule.startTime", "ASC")
                .getRawMany();
            
            // 해당 코트에 예약된 레슨이 없는 경우 예약 상태를 true로 설정
            if (scheduledLessons.length == 0) {
                isLessonScheduled = true;
                
                return court;
            }
        }
    }

    generateRandomString(): string {
        return Math.random().toString(36).slice(2).substr(7, 5);
    }

    encrypt(text: string): string {
        const cipher = createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
      }
    

    async lessonApply(lessonDto: LessonDto) {
        const userName = lessonDto.userName;
        const userPhone = lessonDto.userPhone;
        const coachName = lessonDto.coachName;
    
        const time = lessonDto.time;
        const dayOfWeekBucket: string[] = lessonDto.dayOfWeek;
        const lessonTimeBucket: string[] = lessonDto.lessonTime;
        const startDate = new Date(lessonDto.startDate);
    
        // 코치, 사용자, 코트 정보 가져오기
        const coach = await this.coachRepository.findOne({ where: { name: coachName } });
        const user = await this.userRepository.findOne({ where: { userName: userName, userPhone: userPhone } });
        const court = await this.isLessonScheduledAtCourt(new Date(startDate), new Date(startDate.getTime() + time * 60000));
    
        // 랜덤 비밀번호 생성
        const randomPassword = this.generateRandomString();
        const hashedPassword = await this.encrypt(randomPassword);
    
        // 레슨 시간 및 요일 엔티티 저장
        const savedLessonTimes = await Promise.all(lessonTimeBucket.map(time => this.TimeRepository.save({ time })));
        const savedDayOfWeeks = await Promise.all(dayOfWeekBucket.map(day => this.DayRepository.save({ day })));
    
        const searchLessonUser = await this.findOne({where : { user: user }})
        const isFound = !!searchLessonUser;

        if(isFound==false && coach!=null && user!=null && court!=null && time!=null){
       // 레슨 엔티티 생성 및 저장
       const lesson = new Lesson();
       lesson.password = hashedPassword;
       lesson.time = time;
       lesson.number = dayOfWeekBucket.length;
       lesson.lessonTimes = savedLessonTimes;
       lesson.dayOfWeeks = savedDayOfWeeks;
       lesson.startDate = startDate;
       lesson.coach = coach;
       lesson.user = user;
       lesson.court = court;

       await this.insert(lesson);

       for(let i=0; i<dayOfWeekBucket.length; i++){
           const schedule = new Schedule();
           let setDay;
           if(i==0){
               setDay = startDate;
           }else{
               setDay = this.setDateToDesiredDay(i); 
           }
          
           schedule.startTime = setDay;
           
           schedule.endTime = new Date(startDate.getTime() + time * 60000);
           schedule.coach = coach;
           schedule.user = user;
           schedule.court = court;

           await this.ScheduleRepository.insert(schedule);
        }

        const result = []
        result.push({id : lesson.id, password : randomPassword, lessonStartDate : this.formatDate(startDate)});

        return {success : true, data : result}
        }else{
            return {success : false, data : []}
        }
    }

    setDateToDesiredDay(desiredDayOfWeek) {
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();
        const difference = desiredDayOfWeek + currentDayOfWeek;
    
        // 날짜를 현재 날짜로부터 차이만큼 조정합니다.
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + difference);
    
        return newDate;
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    
}