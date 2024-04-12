import { Check, BaseEntity, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Coach } from "./coach.entity";
import { Court } from "./court.entity";
import { User } from "./user.entity";
import { Lesson } from "./lesson.entity";

@Entity()
export class LessonTime extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time : string

    @ManyToOne(() => Lesson, (lesson) => lesson.dayOfWeeks)
    lesson: Lesson;

}