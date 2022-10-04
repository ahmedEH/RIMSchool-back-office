import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalResponse } from '../models/globalResponse';
import { Message } from '../models/message';
import { Note } from '../models/note';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages:Message[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;
  message:Message | undefined


  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  addMessage(message:Message){
    console.log(("addmessage() service"));
    
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
   console.log("I am finish");
   
    return this.http.post<GlobalResponse<Object>>(environment.apiUrl+ "messages/add",message,{headers:reqHeader})

  }

  getAllMessages(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<Message[]>>(environment.apiUrl+ "messages/list",{headers:reqHeader})

  }

  deleteMessage(id?:number){
    console.log("i am in service");
    
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
   console.log("idddd",id);
   
    return this.http.delete<GlobalResponse<Object>>(environment.apiUrl+ "messages/delete/"+id,{headers:reqHeader})
  }



}

