import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-util-modal',
  templateUrl: './util-modal.component.html',
  styleUrls: ['./util-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UtilModalComponent implements OnInit {
  selectedMessage: any;
  bolWebsite: boolean;
  bolBookmark: boolean;
  SelectedAction;
  constructor(
    private DataService: DataService,
    private messageService: MessageService,
  ) {
    this.bolWebsite = false;
    this.bolBookmark = false;
  }



  ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));

    switch (this.selectedMessage){
      case "addWebsites":{
        this.bolWebsite = true;
        this.bolBookmark = false;
        break;
      }
      case "addBookmark":{
        this.bolBookmark = true;
        this.bolWebsite = false;
        break;
      }
    }
  }




  toastMsg;
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.toastMsg });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.toastMsg });
  }
  onReject() {
    this.messageService.clear('c');
  }

}
