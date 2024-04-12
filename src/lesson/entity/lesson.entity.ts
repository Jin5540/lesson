import { OneToMany, JoinColumn, BaseEntity, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Coach } from "./coach.entity";
import { Court } from "./court.entity";
import { User } from "./user.entity";
import { LessonTime } from "./lessonTime.entity";
import { DayOfWeek } from "./DayOfweek.entity";

@Entity()
export class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password : string

    @ManyToOne(() => Coach, (coach) => coach.Lessons)
    coach: Coach;

    @ManyToOne(() => Court, (court) => court.Lessons)
    court: Court;

    @OneToOne(() => User, user => user.lesson)
    @JoinColumn()
    user: User;

    @Column()
    startDate: Date;

    @OneToMany(() => LessonTime, lessonTime => lessonTime.lesson)
    lessonTimes: LessonTime[];
    
    @OneToMany(() => DayOfWeek, dayOfWeek => dayOfWeek.lesson)
    dayOfWeeks: DayOfWeek[];

    @Column()
    time : number

    @Column()
    number : number
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}