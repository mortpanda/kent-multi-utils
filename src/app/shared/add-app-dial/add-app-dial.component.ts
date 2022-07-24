import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilModalComponent } from '../util-modal/util-modal.component';
import { DataService } from '../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-add-app-dial',
  templateUrl: './add-app-dial.component.html',
  styleUrls: ['./add-app-dial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAppDialComponent implements OnInit {

  constructor(
    private _matdialog: MatDialog,
    private UtilModalComponent: UtilModalComponent,
    private DataService: DataService,
  ) { }

  addUtils = [
    {
      tooltipOptions: {
        tooltipLabel: "Add Websites",
        tooltipPosition: "left",
      },
      icon: "pi pi-microsoft",
      command: () => {
        this.openModal("addWebsites");
      }
    },
    {
      tooltipOptions: {
        tooltipLabel: "Add Bookmark",
        tooltipPosition: "left",
      },
      icon: "pi pi-star-fill",
      command: () => {
        this.openModal("addBookmark");
      }
    },
    {
      tooltipOptions: {
        tooltipLabel: "Add Task Category",
        tooltipPosition: "left",
      },
      icon: "pi pi-list",
      command: () => {
        this.openModal("addTaskCategory");
      }
    },
  ]

  openModal(action) {
    this.DataService.changeMessage(action);
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "auto";
    DialogConfig.width = "400px";
    const modalDialog = this._matdialog.open(UtilModalComponent, DialogConfig);
  }


  ngOnInit(): void {
  }

  async GoHome() {
    // window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }
}
