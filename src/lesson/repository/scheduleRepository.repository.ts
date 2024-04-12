import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Schedule } from "../entity/schedule.entity";

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {
    constructor(dataSource: DataSource) {
        super(Schedule, dataSource.createEntityManager());
    }
}