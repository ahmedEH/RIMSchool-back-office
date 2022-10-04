import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  visibleMenu: boolean;
  

  constructor() {
    this.visibleMenu = false;
   }
  isVisible(){
    return this.visibleMenu;
  }
}
