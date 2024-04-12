import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Court } from "../entity/court.entity";
import { DayOfWeek } from "../entity/DayOfweek.entity";
import { LessonTime } from "../entity/lessonTime.entity";

@Injectable()
export class timeRepository extends Repository<LessonTime> {
    constructor(dataSource: DataSource) {
        super(LessonTime, dataSource.createEntityManager());
    }
}