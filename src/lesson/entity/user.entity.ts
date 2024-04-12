import { JoinColumn, Unique, BaseEntity, OneToMany, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Column, OneToOne } from "typeorm";
import { Lesson } from "./lesson.entity";
import { Schedule } from "./schedule.entity";

@Entity()
@Unique(['userPhone'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string;

    @Column()
    userPhone: string;

    @OneToOne(() => Lesson, lesson => lesson.user)
    @JoinColumn()
    lesson : Lesson

    @OneToMany(() => Schedule, (schedule) =>schedule.coach)
    @JoinColumn()
    schedules : Schedule[]
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}