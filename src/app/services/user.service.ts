import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalResponse } from '../models/globalResponse';
import { Permission } from '../models/permission';
import { UserVo } from '../models/userVo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  permissions:Permission[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  userVo:UserVo = new UserVo();


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addUser(userVo:UserVo){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<UserVo>>(environment.apiUrl+ "users/create",userVo,{headers:reqHeader})

  }

  getAllUsers(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<UserVo[]>>(environment.apiUrl+ "users/list",{headers:reqHeader})

  }

  switchStatus(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<boolean>>(environment.apiUrl+ "users/status/"+id,{headers:reqHeader})

  }
  deleteUser(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
   return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "users/delete/"+id,{headers:reqHeader})

  }
}
