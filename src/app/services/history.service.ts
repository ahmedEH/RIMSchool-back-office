import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { History } from '../models/history';
import { GlobalResponse } from '../models/globalResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  histories:History[] | undefined;
  authService:AuthService | undefined;
  http:HttpClient ;



  constructor(authService:AuthService,http:HttpClient) { 

    this.authService = authService;
    this.http = http;
    
  }

  getAllHistories(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
   });
    return this.http.get<GlobalResponse<History[]>>(environment.apiUrl+ "history/list",{headers:reqHeader})

  }
}
