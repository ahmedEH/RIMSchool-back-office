export class GlobalResponse<Obj>{
    status: string | undefined;
    code: number | undefined;
    message : string | undefined;
    result: Obj ;

    constructor(status:string,code:number,message:string,result:Obj){
        this.status = status;
        this.code = code;
        this.message = message;
        this.result = result;
    }

}