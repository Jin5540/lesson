import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Court } from "../entity/court.entity";
import { DayOfWeek } from "../entity/DayOfweek.entity";

@Injectable()
export class DayRepository extends Repository<DayOfWeek> {
    constructor(dataSource: DataSource) {
        super(DayOfWeek, dataSource.createEntityManager());
    }
}