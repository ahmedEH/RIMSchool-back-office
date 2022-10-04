import { MapType } from "@angular/compiler";

export class Note{


    subject:string = ""
    content:string =""
    data:Map<string,string> | undefined
    image:string = ''


    constructor(subject:string,content:string,data:Map<string,string>,image:string){

        this.subject = subject
        this.content = content
        this.data = data;
        this.image = image

    }
}