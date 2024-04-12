import { JoinColumn, BaseEntity, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Coach } from "./coach.entity";
import { Court } from "./court.entity";
import { User } from "./user.entity";

@Entity('schedule')
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Coach, (coach) => coach.schedules)
    @JoinColumn()
    coach: Coach;

    @ManyToOne(() => Court, (court) => court.schedules)
    @JoinColumn()
    court: Court;

    @ManyToOne(() => User, (user) => user.schedules)
    @JoinColumn()
    user: User;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}