import { Matter } from "./matter";

export class Post{
    id: number | undefined;
    title: string | undefined;
    text: string | undefined;
    created_at: Date | undefined;
    matter: Matter | undefined

    constructor(id?:number,title?:string,text?:string,created_at?:Date,matter?:Matter){
        this.id = id;
        this.title = title;
        this.text = text;
        this.created_at = created_at;
        this.matter = matter
    }
}