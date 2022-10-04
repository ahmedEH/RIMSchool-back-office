export class LoginRequest{
    login:string | undefined;
    password:string | undefined;

    constructor(login:string,password:string){
        this.login = login;
        this.password = password;
    }
}