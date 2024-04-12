import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Lesson } from "../entity/lesson.entity";
import { CoachDto } from "../dto/coach.dto";
import { LocalDateTime, Instant, ZoneOffset } from 'js-joda';
import { DateTimeFormatter as JSJodaDateTimeFormatter } from 'js-joda';
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "../entity/schedule.entity";

@Injectable()
export class LessonSearchRepository extends Repository<Lesson> {
    
    constructor(        
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    dataSource: DataSource) {
        super(Lesson, dataSource.createEntityManager());
    }

    async getNextDayDate(): Promise<Date> {
        const date = LocalDateTime.now();
        const nextDayAtSeven = date.withHour(7).withMinute(0).withSecond(0).withNano(0);
        const nextDay = nextDayAtSeven.plusDays(1);
        const formattedDate = nextDay.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);
        
        return new Date(formattedDate);
    }

    async getSevenDaysLaterDate(): Promise<Date> {
        const date = LocalDateTime.now();
        const nextDayAteleven = date.withHour(23).withMinute(0).withSecond(0).withNano(0);
        const nextWeek = nextDayAteleven.plusDays(7);
        const formattedDate = nextWeek.format(JSJodaDateTimeFormatter.ISO_LOCAL_DATE_TIME);

        return new Date(formattedDate);
    }

    firstDate(result:any[], lessonTime: number):Date{
        for( const re of result){
            const difference = re.difference;
            for (const timeV of re.result.time) {
                if(difference >= lessonTime){
                    return timeV
                }
            }
        }
    }

    calculation(result: any[], lessonTime: number, lessonNum: number):{resutDate : any[]} {
        let dayBucket = null;
        let count = 1;
        const differentDaysData : any[] = [];
        const threeBucket : any[] = [];
        const twoBucket : any[] = [];

        const firstDay = new Date(this.firstDate(result, lessonTime)).getDay();
        const first = new Date(this.firstDate(result, lessonTime));

        for (let i = 0; i < result.length; i++) {
            const difference = result[i].difference;
            for (const timeV of result[i].result.time) {
                const currentDay = new Date(timeV).getDay();
               
                if(lessonNum == 3){

                    if (dayBucket!= currentDay &&firstDay !== currentDay && difference >= lessonTime) {
                        dayBucket = currentDay;
                        count++;

                        threeBucket.push(this.formatDate(new Date(timeV)));
                    } 
                    if(dayBucket == currentDay && difference >= lessonTime)
                        threeBucket.push(this.formatDate(new Date(timeV)));
                    if(firstDay == currentDay && difference >= lessonTime)
                        threeBucket.push(this.formatDate(new Date(timeV)));
                }
                if(lessonNum == 2){
                    if (currentDay !== firstDay && difference >= lessonTime) {
                        count++;
                        twoBucket.push(this.formatDate(new Date(timeV)));
                    }
                    if(firstDay == currentDay && difference >= lessonTime)
                    twoBucket.push(this.formatDate(new Date(timeV)));
                }
            }
        }
        if (count >= 3) {
            differentDaysData.push(...threeBucket);
        }
        if (count >= 2){
            differentDaysData.push(...twoBucket);
        }

        return {resutDate : differentDaysData};
    }
    

    async getCoachTime(CoachDto: CoachDto): Promise<{ success: boolean, result: any [] }> {
        try {
            const coachName = CoachDto.name;
            const lessonTime = CoachDto.time;
            const lessonNum = CoachDto.number;

            const utcDateT = await this.getNextDayDate();
            const utcDateN = await this.getSevenDaysLaterDate();
    
            const Impossible = await this.scheduleRepository
                .createQueryBuilder("schedule")
                .innerJoin("schedule.coach", "coach")
                .where("coach.name = :name", { name: coachName })
                .andWhere("schedule.startTime BETWEEN :utcDateT AND :utcDateN", { utcDateT, utcDateN })
                .select("schedule.startTime, schedule.endTime")
                .orderBy("schedule.startTime", "ASC")
                .getRawMany();
            
            //console.log(Impossible);
            const newfirstData = {
                startTime: this.firstTimeS(), 
                endTime: this.firstTimeE() 
              };

              const newlastData = {
                startTime: this.lastTimeS(), 
                endTime: this.lastTimeE() 
              };

            Impossible.unshift(newfirstData);
            Impossible.push(newlastData);

            const result = this.compareTimes(Impossible);
            const resutDate = this.calculation(result.result, lessonTime, lessonNum);
            
            return { success: result.success, result: resutDate.resutDate };

            } catch (error) {
                console.error("An error occurred:", error);
                return { success: false, result: [] };
            }
        }

    compareTimes(data: any[]): { success: boolean, result: any[] }  {
        const timeDifference : any[] =[];
        for (let i = 1; i < data.length; i++) {
            const endTime = data[i - 1].endTime;
            const startTime = data[i].startTime;
            timeDifference.push(this.compareEndAndStart(endTime, startTime, i));
        }
        
        return { success: true, result : timeDifference };
    }

    compareEndAndStart(end: string, start: string, index: number): {result: string[], difference: number} {
        //const minDiffrence: number[] =[];
        let startTimeObj = new Date(start);
        let endTimeObj = new Date(end);
        let difference = Math.abs(startTimeObj.getTime() - endTimeObj.getTime()) / (1000 * 60); // 시간 차이를 분 단위로 계산
        let result;
        try {
            result = this.displayTimeIntervals(startTimeObj, endTimeObj, difference);
            //minDiffrence.push(difference);
        } catch (error) {
            console.error("An error occurred while comparing end and start times:", error);
        }
        return {result, difference};
    }

    firstTimeS(){
        const now = new Date();
        now.setDate(now.getDate() + 1);
        now.setHours(6, 0, 0, 0);

        const nowSet = new Date(now);
        return nowSet
    }

    firstTimeE(){
        const now = new Date();
        now.setDate(now.getDate() + 1);
        now.setHours(7, 0, 0, 0);

        const nowSet = new Date(now);
        return nowSet
    }

    lastTimeS(){
        const now = new Date();
        now.setDate(now.getDate() + 8);
        now.setHours(6, 0, 0, 0);

        const lastSet = new Date(now);
        return lastSet
    }

    lastTimeE(){
        const now = new Date();
        now.setDate(now.getDate() + 8);
        now.setHours(7, 0, 0, 0);

        const lastSet = new Date(now);
        return lastSet
    }
    

    private displayTimeIntervals(startTime: Date, endTime: Date, difference: number): { time: string[]} {
        const time: string[] = []; // 결과를 저장할 배열
        const interval = 30; // 간격: 30분
        let newTime;
        const numberOfIntervals = Math.floor(difference / interval); // 시간 차이를 간격으로 나눈 횟수
            try {
                for (let i = 0; i < numberOfIntervals; i++) {
                    newTime = new Date(endTime.getTime() + (interval * i * 60000));
                    if (newTime.getTime() < startTime.getTime() && newTime.getHours()>=7 && newTime.getHours()<=23) {
                        if(newTime.getHours()==23 && newTime.getMinutes()<30){
                            time.push(newTime.toISOString());
                        }else if(newTime.getHours()<23){
                            time.push(newTime.toISOString());
                        }
                        
                    }
                }     
                return ({ time });
            } catch (error) {
                return({ time: [] });
            }
    };
    
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