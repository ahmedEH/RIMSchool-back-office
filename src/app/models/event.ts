import { EventType } from "../enumerations/eventType";

export class Event{
    id:number | undefined;
    type: EventType | undefined;
    description: string | undefined;

    contructor(id:number,type:EventType,description:string){
        this.id = id;
        this.type = type;
        this.description = description;
    }
}