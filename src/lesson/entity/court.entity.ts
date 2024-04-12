import { PrimaryColumn, Unique, BaseEntity, OneToMany, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Column } from "typeorm";
import { Lesson } from "./lesson.entity";
import { Schedule } from "./schedule.entity";

@Entity()
@Unique(['courtNumber'])
export class Court extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    courtNumber: number;

    @OneToMany(() => Lesson, (lesson) =>lesson.court)
    Lessons : Lesson[]
    
    @OneToMany(() => Schedule, (schedule) =>schedule.coach)
    schedules : Schedule[]
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}
