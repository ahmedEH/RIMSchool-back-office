
import { Operation } from "../enumerations/operation";
import { Tables } from "../enumerations/tables";
import { User } from "./user";

export class History{
    id: number | undefined;
    table_name: Tables | undefined;
    record_id: number | undefined;
    operation: Operation | undefined;
    user: User | undefined;
    created_at: Date | undefined;
    description: string | undefined;

    constructor(id:number,table_name:Tables,
        record_id:number,operation:Operation,
        user: User,created_at:Date,description:string){

            this.id = id;
            this.table_name = table_name;
            this.record_id = record_id;
            this.operation = operation;
            this.user = user;
            this.created_at = created_at;
            this.description = description;

    }
    
}