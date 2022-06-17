import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
import { OktaSDKAuthService } from '../okta/okta-auth.service';
import { OktaConfigService } from '../okta/okta-config.service';
@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  constructor(
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
  ) { }

  mainAppMenu = [
    {
      tooltipOptions: {
        tooltipLabel: "Websites",
        tooltipPosition: "top",
      },
      icon: "pi pi-bars",
      style: 'font-size: 2rem;',
      routerLink: '/'
    },
    

    {
      tooltipOptions: {
        tooltipLabel: "To Do",
        tooltipPosition: "top",
      },
      icon: "pi pi-home",
      style: 'font-size: 2rem;',
      command: () => {
        this.GoHome();
      }
    },

    {
      tooltipOptions: {
        tooltipLabel: "World Clock",
        tooltipPosition: "top",
      },
      icon: "pi pi-bars",
      style: 'font-size: 2rem;',
      routerLink: '/'
    },

  ]



  smallToolbar = [
    {
      label: "Main Menu",
      icon: "pi pi-bars",

    },

    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        this.GoHome();
      }
    },

    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: () => {
        this.Logout();
      }
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
      command: () => {
        this.GoHome();
      }
    },

    {
      tooltipOptions: {
        tooltipLabel: "Logout",
        tooltipPosition: "right",
      },
      icon: "pi pi-power-off",
      style: 'font-size: 2rem;',
      command: () => {
        this.Logout();
      }
    },
  ]

  async Logout() {
    this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }

  async GoHome() {
    window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }

}
