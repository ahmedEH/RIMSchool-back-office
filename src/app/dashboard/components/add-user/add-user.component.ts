import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router'
import { Roles } from 'src/app/enumerations/Roles';
import { States } from 'src/app/enumerations/States';
import { Permission } from 'src/app/models/permission';
import { User } from 'src/app/models/user';
import { UserVo } from 'src/app/models/userVo';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  error:any;
  submitted:any = false
  type = "password";
  isAuth:boolean | undefined
  authService: AuthService;
  check:boolean | undefined;
  userForm= new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(5)]),
    password: new FormControl('',[Validators.minLength(8),Validators.required]),
    login: new FormControl('',[Validators.required,Validators.minLength(8)]),
    tel: new FormControl('',[Validators.required,Validators.minLength(8)]),
    email:new FormControl('',Validators.required),
    state: new FormControl('',[Validators.required]),
  });

  permissionService:PermissionService;
  permissions:Permission[] =[]
  permissionClicked:Permission[] =[]
  permissionClass: string[] = []
  userService:UserService ;
  user:User = new User();
  userVo: UserVo = new UserVo();

  router:Router;




  constructor(authService:AuthService,router:Router,permissionService:PermissionService,userService:UserService,private location:Location,) { 
    this.authService = authService;
    this.userService = userService;
    this.permissionService = permissionService;
    this.router = router

    this.permissionService.getPermissions().subscribe(
      (data) =>{
        console.log(data);
        if(data !== null){
          this.permissions = data.result;
        }

        if(this.permissions !==undefined){
          for (let index = 0; index < this.permissions.length; index++) {
            this.permissionClass[index] = 'btn btn-secondary m-3';
            
          }
        }

      }
    );


  }
    

  

  ngOnInit(): void {
  }
  onSubmit(){
    this.submitted = true;
    console.log("userForm",this.userForm.value);
    this.user = this.userForm.value;
    this.user.role = Roles.Simple
    console.log("user",this.user)
    this.userVo = new UserVo(this.user,this.permissionClicked)
    this.userService.addUser(this.userVo).subscribe((val) =>{
      console.log("addUser()",val)
      this.error = false;
    },
    (error) =>{
      this.error = true;
    })
    
  }

  isError(){
    return this.error === true;
  }
  select(i:number){
    this.permissionClass[i] = 'btn btn-primary m-3'
    this.permissionClicked.push(this.permissions[i]);
    console.log("permissionClicked",this.permissionClicked)

  }
  isPassword(){
    return this.type ==="password";
  }

  isText(){
    return this.type == "text";
  }

  onSwitch(){
    console.log("this.check",this.check);
    if(this.check){
      this.type = "text"
    }else {
      this.type = "password"
    }
    
  }


}
