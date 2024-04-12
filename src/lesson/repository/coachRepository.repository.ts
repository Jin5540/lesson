import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Coach } from "../entity/coach.entity";

@Injectable()
export class CoachRepository extends Repository<Coach> {
    constructor(dataSource: DataSource) {
        super(Coach, dataSource.createEntityManager());
    }
}