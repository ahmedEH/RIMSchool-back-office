import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private router:Router, private authService: AuthService ) {
 
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {
        console.log("this.authService.isAuth",this.authService.isAuth);
 
        if (!this.authService.isUserLoggedIn()) {
            console.log("canActivate");
            
            
            this.router.navigate(["/login"],{ queryParams: { retUrl: route.url} });
            return false;
 
            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        } 
        console.log("this.authService.isAuth2",this.authService.isAuth);
 
        return true;
    }
  }