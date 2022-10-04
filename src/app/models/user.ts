import { Roles } from "../enumerations/Roles";
import { States } from "../enumerations/States";
import { Permission } from "./permission";

export class User{

    id: number | undefined;
    name: string | undefined;
    login: string | undefined;
    password: string | undefined;
    role: String | undefined;
    state: States | undefined;
    tel: string | undefined;
    email: string | undefined;

    constructor(id?:number,name?:string,login?:string,password?:string,role?:String,state?:States,tel?:string,email?:string){
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.role = role;
        this.state = state;
        this.tel = tel;
        this.email = email;

    }

}