import { User } from "./user";
import { UserVo } from "./userVo";

export class UserToken{
    user: UserVo | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;

    constructor(user:UserVo,accessToken:string,refreshToken:string){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;

    }
}