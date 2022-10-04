import { Level } from "./level";
import { Media } from "./media";
import { Post } from "./post";

export class Matter{

    id: number | undefined;
    name : string | undefined;
    created_at: Date | undefined;
    posts : Post[] | undefined;
    medias : Media[] | undefined;
    level:Level | undefined

    constructor(id?:number,name?:string,created_at?:Date,posts?:Post[],medias?:Media[],level?:Level){
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.posts = posts;
        this.medias = medias;
        this.level = level

    }



}