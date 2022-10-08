import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { PermissionType } from '../enumerations/permissionType';
import { AuthService } from './auth.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    permission:PermissionType
    constructor(private router:Router, private authService: AuthService ) {
        
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {
                    this.permission = route.data['roles'] as PermissionType
        console.log("this/permission",this.permission);
        
 
        if (!this.authService.isUserLoggedIn()) {
            console.log("canActivate");
            
            
            this.router.navigate(["/login"],{ queryParams: { retUrl: route.url} });
            return false;
 
            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        } else if(!this.isAdministrator() && !this.isPermitted(this.permission)){

            this.router.navigate(["/not-found"],{ queryParams: { retUrl: route.url} });
            return false;
        }

        console.log("this.authService.isAuth2",this.authService.isAuth);
 
        return true;
    }
    isAdministrator(){
        return this.authService.isAdministrator();

    }
    isPermitted(p:PermissionType){
        return this.authService.isPermitted(p);
    }
  }