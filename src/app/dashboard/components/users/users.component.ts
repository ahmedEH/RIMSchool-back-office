import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVo } from 'src/app/models/userVo';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { States } from 'src/app/enumerations/States';
import { PermissionType } from 'src/app/enumerations/permissionType';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  DeleteUser= PermissionType.DeleteUser;

  usersVo:UserVo[] =[];
  authService:AuthService;
  headers:String[] = [

    "Login",
    "Name",
    "Role",
    "State",
    "Telephone",
    "Email",
    "Permissions",
  ]
  userService:UserService;
  constructor(userService:UserService,authService:AuthService,router:Router) { 
    this.userService = userService;
    this.authService = authService;
    if(this.authService.isUserLoggedIn()){
      router.navigate(['/users']);
    }

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (val) =>{
        this.usersVo = val.result;
        
        console.log("userVo",this.usersVo);
        
      }
    )
  }
  toggle(id?:number){
    this.userService.switchStatus(id).subscribe((response) =>{
      console.log(response.result);
      this.userService.getAllUsers().subscribe(
        (val) =>{
          this.usersVo = val.result;
        }
      )
      
    });

  }

  deleteUser(id?:number){
    this.userService.deleteUser(id).subscribe((val) =>{
      this.ngOnInit();
    })
  }
  isAdministrator(){
    return this.authService.isAdministrator();
  }
  isPermitted(p:PermissionType){
    return this.authService.isPermitted(p);
  }

}
