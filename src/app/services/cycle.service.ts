import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cycle } from '../models/cycle';
import { Faculty } from '../models/faculty';
import { GlobalResponse } from '../models/globalResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  cycles:Cycle[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  cycle:Cycle | undefined


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addCycle(cycle:Cycle){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Cycle>>(environment.apiUrl+ "cycles/create",cycle,{headers:reqHeader})

  }

  editCycle(cycle:Cycle){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Cycle>>(environment.apiUrl+ "cycles/edit",cycle,{headers:reqHeader})

  }

  getAllCycles(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Cycle[]>>(environment.apiUrl+ "cycles/list",{headers:reqHeader})

  }
  getFaculties(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Faculty[]>>(environment.apiUrl+ "faculties/getcycle/"+id,{headers:reqHeader})

  }
  getCycle(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Cycle>>(environment.apiUrl+ "cycles/"+id,{headers:reqHeader})
  }
  deleteCycle(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "cycles/delete/"+id,{headers:reqHeader})
  }
}
