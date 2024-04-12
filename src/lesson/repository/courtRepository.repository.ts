import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Court } from "../entity/court.entity";

@Injectable()
export class CourtRepository extends Repository<Court> {
    constructor(dataSource: DataSource) {
        super(Court, dataSource.createEntityManager());
    }
}