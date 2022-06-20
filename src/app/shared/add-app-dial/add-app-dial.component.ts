import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-app-dial',
  templateUrl: './add-app-dial.component.html',
  styleUrls: ['./add-app-dial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAppDialComponent implements OnInit {

  constructor() { }

  addUtils = [
    {
      tooltipOptions: {
        tooltipLabel: "Add Websites",
        tooltipPosition: "top",
      },
      icon: "pi pi-microsoft",
      // style: 'font-size: 2rem;',
      command: () => {
        this.GoHome();
      }
    },
    {
      tooltipOptions: {
        tooltipLabel: "Add Bookmark",
        tooltipPosition: "top",
      },
      icon: "pi pi-star-fill",
      // style: 'font-size: 2rem;',
      command: () => {
        this.GoHome();
      }
    },
  ]


  ngOnInit(): void {
  }

  async GoHome() {
    // window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }
}
