import { Cycle } from "./cycle";
import { Level } from "./level";

export class Faculty{

    id: number | undefined;
    name : string | undefined;
    created_at: Date | undefined;
    levels : Level[] | undefined;
    cycle : Cycle | undefined

    constructor(id?:number,name?:string,created_at?:Date,levels?:Level[],cycle?:Cycle){
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.levels = levels;
        this.cycle = cycle

    }



}