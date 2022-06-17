import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  constructor() { }

  smallToolbar = [
    {
      label: "Main Menu",
      icon: "pi pi-bars",
      style: 'font-size: 2rem;',
    },

    {
      label: "Home",
      icon: "pi pi-home",
      style: 'font-size: 2rem;',
    },

    {
        label: "Logout",
      icon: "pi pi-power-off",
      routerLink: '/'
    },
  ]

  mainDockItems = [
    {
      tooltipOptions: {
        tooltipLabel: "Daily Websites",
        tooltipPosition: "right",
      },
      icon: "pi pi-bars",
      style: 'font-size: 2rem;',
      routerLink: '/'
    },

    {
      tooltipOptions: {
        tooltipLabel: "Home",
        tooltipPosition: "right",
      },
      icon: "pi pi-home",
      style: 'font-size: 2rem;',
      routerLink: '/'
    },

    {
      tooltipOptions: {
        tooltipLabel: "Logout",
        tooltipPosition: "right",
      },
      icon: "pi pi-power-off",
      style: 'font-size: 2rem;',
      routerLink: '/'
    },
  ]

  async Logout() {
    // this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }

  async GoHome() {
    // window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }

}
