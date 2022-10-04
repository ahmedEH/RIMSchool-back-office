import { NotificationType } from "../enumerations/notificationType";

export class Notification{
    id: number | undefined;
    type: NotificationType | undefined;
    event: Event | undefined;
    created_at: Date | undefined;

    constructor(id:number,
                type:NotificationType,
                event:Event,
                created_at:Date){

                    this.id = id;
                    this.type = type;
                    this.event = event;
                    this.created_at = created_at;

    }
}