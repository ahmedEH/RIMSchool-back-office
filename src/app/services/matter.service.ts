import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalResponse } from '../models/globalResponse';
import { Matter } from '../models/matter';
import { Media } from '../models/media';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MatterService {

  matters:Matter[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  matter:Matter | undefined


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addMatter(matter:Matter){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Matter>>(environment.apiUrl+ "matters/create",matter,{headers:reqHeader})

  }

  editMatter(matter:Matter){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Matter>>(environment.apiUrl+ "matters/edit",matter,{headers:reqHeader})

  }

  getAllMatters(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Matter[]>>(environment.apiUrl+ "matters/list",{headers:reqHeader})

  }
  getMedias(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Media[]>>(environment.apiUrl+ "matters/getmedias/"+id,{headers:reqHeader})

  }
  getPosts(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Media[]>>(environment.apiUrl+ "matters/getposts/"+id,{headers:reqHeader})

  }
  getMatter(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Matter>>(environment.apiUrl+ "matters/"+id,{headers:reqHeader})
  }
  deleteMatter(id?:number){
    console.log("i am in service");
    
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
   console.log("idddd",id);
   
    return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "matters/delete/"+id,{headers:reqHeader})
  }
}
