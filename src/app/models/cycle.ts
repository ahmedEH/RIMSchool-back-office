import { Faculty } from "./faculty";

export class Cycle{

    id: number | undefined;
    name : string | undefined;
    created_at: Date | undefined;
    faculties : Faculty[] | undefined;

    constructor(id?:number,name?:string,created_at?:Date,faculties?:Faculty[]){
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.faculties = faculties;

    }



}