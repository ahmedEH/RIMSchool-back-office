import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Roles } from './enumerations/Roles';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schoolroom-back-office';
  authService: AuthService;
  menuService: MenuService;
  role:String | undefined;
  menuItems = [
    {name:'Home',route:'/home',icon:'home'},
    {name:'Users',route:'/users',icon:'account_circle'},
    {name:'Add User',route:'/add-user',icon:'person_add'},
    {name:'Cycles',route:'/cycles',icon:'people'},

  ]
  constructor(authService: AuthService, 
    menuService: MenuService,
    private router:Router){
    this.authService = authService;
    this.menuService = menuService;

    

  }



}
