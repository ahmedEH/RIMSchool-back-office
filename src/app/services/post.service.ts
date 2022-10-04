import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalResponse } from '../models/globalResponse';
import { Matter } from '../models/matter';
import { Post } from '../models/post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts:Post[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  post:Post | undefined


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addPost(post:Post){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.post<GlobalResponse<Post>>(environment.apiUrl+ "posts/create",post,{headers:reqHeader})

  }

  getAllPosts(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Post[]>>(environment.apiUrl+ "medias/list",{headers:reqHeader})

  }
  getPosts(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Post[]>>(environment.apiUrl+ "matters/getposts/"+id,{headers:reqHeader})

  }
  getMatter(id?:number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Matter>>(environment.apiUrl+ "matters/"+id,{headers:reqHeader})
  }
  deletePost(id?:number){
    console.log("i am in service");
    
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
   console.log("idddd",id);
   
    return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "posts/delete/"+id,{headers:reqHeader})
  }


}
