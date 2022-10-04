import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { AuthService } from 'src/app/services/auth.service';
import { forEach } from 'typescript-collections/dist/lib/arrays';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.scss']
})
export class SidenavWrapperComponent {

  isExpanded: boolean = false;
  active ="secondary"

  menuItems = [
    {
      name:'Home',
      route:'home',
      icon:'home',
      permission:PermissionType.Home
    },

    {
      name:'Users',
      route:'users',
      icon:'account_circle',
      permission:PermissionType.SeeUsers
    },
    {
      name:'Add user',
      route:'add-user',
      icon:'person_add',
      permission:PermissionType.AddUser
    },
    {
      name:'Cycles',
      route:'cycles',
      icon:'people',
      permission:PermissionType.SeeCycles
    },
    {
      name:'Messages',
      route:'messages',
      icon:'message',
      permission:PermissionType.SeeMessages
    },
    {
      name:'History',
      route:'history',
      icon:'history',
      permission:PermissionType.SeeHistory
    },
  ]
  listMenuItems: any[] = [];

  authService:AuthService;
  router:Router;

  constructor(authService:AuthService,router:Router) {
    this.authService = authService;
    this.router = router;
    // if(this.isAdministrator()){
    //   this.listMenuItems = this.menuItems;
    // }
    // else{
    //   var i = 0;
    //   this.menuItems.forEach(element => {
    //     if(element.route != "add-user" && element.route != "users" && element.route != "history"){
    //       this.listMenuItems[i] = element;
    //       i++;
    //     }

        
    //   });
    // }

  }

  logout(){
    sessionStorage.clear();
    this.menuItems = [];
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }
  isAdministrator(){
    return this.authService.isAdministrator();
    

  }
  isSimple(){
    return this.authService.isSimple();
  }
  isPermitted(p:PermissionType){
    return this.authService.isPermitted(p);
  }

}
