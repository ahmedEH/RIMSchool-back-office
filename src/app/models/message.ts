import { User } from "./user";

export class Message{
    id: number | undefined;
    text: string | undefined;
    user: User | undefined;
    created_at: Date | undefined;


    constructor(id?:number,text?:string,created_at?:Date,user?:User){
        this.id = id;
        this.text = text;
        this.created_at = created_at;
        this.user = user


    }
}