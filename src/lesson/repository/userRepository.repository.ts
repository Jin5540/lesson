import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "../entity/user.entity";

@Injectable()
export class USerRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}