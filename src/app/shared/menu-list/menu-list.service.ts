import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  constructor() { }


  mainDockItems = [
    {
      label: 'Daily Websites',
      icon: "assets/img/menu_white.png", 
      routerLink: '/'
    },
    {
      label: 'Daily Websites',
      icon: "assets/img/cabin_white.png", 
      routerLink: '/'
    },
    {
      label: 'Daily Websites',
      icon: "assets/img/exit_white.png", 
      routerLink: '/'
    },
  ]

}
