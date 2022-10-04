import { MediaType } from "../enumerations/mediaType";
import { Matter } from "./matter";

export class Media{
    id: number | undefined;
    title: string | undefined;
    type: MediaType | undefined;
    path: string | undefined;
    created_at: Date | undefined;
    matter:Matter | undefined

    constructor(id?:number,title?:string,type?:MediaType,path?:string,created_at?:Date,matter?:Matter){
        this.id = id;
        this.title = title;
        this.type = type;
        this.path = path;
        this.created_at = created_at;
        this.matter = matter

    }
}