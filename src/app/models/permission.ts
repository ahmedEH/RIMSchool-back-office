import { PermissionType } from "../enumerations/permissionType";

export class Permission{
    id: number | undefined;
    name: PermissionType | undefined;
    description: string | undefined;

    constructor(id:number,
                name:string,
                description:string){

    }

}