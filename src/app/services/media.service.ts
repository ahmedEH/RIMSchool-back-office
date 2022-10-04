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
export class MediaService {
  medias:Media[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  media:Media | undefined
  file:File | undefined


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addMedia(formData:FormData){
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
   console.log("this.service.media  medias service",formData.get("media"));
   
    return this.http.post<GlobalResponse<Media>>(environment.apiUrl+ "medias/create",formData,{headers:reqHeader})

  }

  getAllMedias(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Media[]>>(environment.apiUrl+ "medias/list",{headers:reqHeader})

  }
  getMedias(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Media[]>>(environment.apiUrl+ "matters/getmedias/"+id,{headers:reqHeader})

  }
  getMatter(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Matter>>(environment.apiUrl+ "matters/"+id,{headers:reqHeader})
  }
  deleteMedia(id?:number){
    console.log("i am in service delete media");
    
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
   console.log("idddd",id);
   
    return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "medias/delete/"+id,{headers:reqHeader})
  }



}
