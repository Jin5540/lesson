import { Unique, BaseEntity, OneToMany, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, PrimaryColumn, Column } from "typeorm";
import { Lesson } from "./lesson.entity";
import { Schedule } from "./schedule.entity";

@Entity()
@Unique(['name'])
export class Coach extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToMany(() => Lesson, (lesson) =>lesson.coach)
    Lessons : Lesson[]

    @OneToMany(() => Schedule, (schedule) =>schedule.coach)
    schedules : Schedule[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}