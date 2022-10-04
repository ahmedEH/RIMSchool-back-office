import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Faculty } from '../models/faculty';
import { GlobalResponse } from '../models/globalResponse';
import { Level } from '../models/level';
import { Matter } from '../models/matter';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  levels:Level[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  faculty:Faculty | undefined


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addLevel(level:Level){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Level>>(environment.apiUrl+ "levels/create",level,{headers:reqHeader})

  }

  editLevel(level:Level){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Level>>(environment.apiUrl+ "levels/edit",level,{headers:reqHeader})

  }

  getAllLevels(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Level[]>>(environment.apiUrl+ "levels/list",{headers:reqHeader})

  }
  getMatters(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Matter[]>>(environment.apiUrl+ "matters/getlevel/"+id,{headers:reqHeader})

  }
  getLevel(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Level>>(environment.apiUrl+ "levels/"+id,{headers:reqHeader})
  }


  deleteLevel(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "levels/delete/"+id,{headers:reqHeader})
  }
}
