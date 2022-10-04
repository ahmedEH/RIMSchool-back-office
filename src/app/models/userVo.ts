import { Permission } from "./permission";
import { User } from "./user";

export class UserVo{
    user: User | undefined;
    permissions:Permission[] | undefined;

    constructor(user?:User,permissions?:Permission[]){
        this.user = user;
        this.permissions = permissions;
    }
}