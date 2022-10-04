import { Faculty } from "./faculty";
import { Matter } from "./matter";

export class Level{

    id: number | undefined;
    name : string | undefined;
    created_at: Date | undefined;
    matters : Matter[] | undefined;
    faculty:Faculty | undefined

    constructor(id?:number,name?:string,created_at?:Date,matters?:Matter[],faculty?:Faculty){
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.matters = matters;
        this.faculty = faculty;

    }



}