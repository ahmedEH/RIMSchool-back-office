import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cycle } from '../models/cycle';
import { Faculty } from '../models/faculty';
import { GlobalResponse } from '../models/globalResponse';
import { Level } from '../models/level';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  faclties:Faculty[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  faculty:Faculty | undefined


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addFaculty(faculty:Faculty){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Faculty>>(environment.apiUrl+ "faculties/create",faculty,{headers:reqHeader})

  }

  editFaculty(faculty:Faculty){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Faculty>>(environment.apiUrl+ "faculties/edit",faculty,{headers:reqHeader})

  }

  getAllFaculties(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Faculty[]>>(environment.apiUrl+ "faculties/list",{headers:reqHeader})

  }
  getLevels(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Level[]>>(environment.apiUrl+ "levels/getfaculty/"+id,{headers:reqHeader})

  }

  getFaculty(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Faculty>>(environment.apiUrl+ "faculties/"+id,{headers:reqHeader})
  }
  deleteFaculty(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "faculties/delete/"+id,{headers:reqHeader})
  }
}
