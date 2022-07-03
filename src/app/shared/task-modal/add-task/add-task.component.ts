import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfigService } from "../../okta/okta-config.service";
import { OktaApiService } from "../../okta/okta-api.service";
import { OktaGetTokenService } from '../../okta/okta-get-token.service';

interface myTaskCat {
  toDoCategories: string,
}


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent implements OnInit {
  selectedMessage: any;
  // strTaskType;

  myKey;
  myAccessToken;
  myEmail;

  myTaskType;
  arrDownloadedTaskCat;

  bolNew: boolean;
  bolWip: boolean;
  bolComp: boolean;

  addTaskSelectedCat: myTaskCat[];

  taskTitle;
  taskNotes;

  constructor(
    private DataService: DataService,
    private messageService: MessageService,
    private OktaApiService: OktaApiService,
    public OktaConfigService: OktaConfigService,
    private OktaGetTokenService: OktaGetTokenService,
  ) {
    this.bolNew = false;
    this.bolWip = false;
    this.bolComp = false;
  }


  async saveTask(taskType) {
    alert(taskType)
  }

  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.myTaskType = this.selectedMessage;

    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
    this.myKey = await this.myAccessToken.claims.myKey;
    this.myEmail = await this.myAccessToken.claims.sub;
    this.arrDownloadedTaskCat = await this.GetTaskCat(this.OktaConfigService.strMyToDoCatDownload, this.myKey, this.myEmail);
    console.log(this.arrDownloadedTaskCat);



    switch (this.myTaskType) {
      case 'addNew': {
        this.bolNew = true;
        this.bolWip = false;
        this.bolComp = false;
        break;
      }
      case 'addWIP': {
        this.bolNew = false;
        this.bolWip = true;
        this.bolComp = false;
        break;
      }
      case 'addComplete': {
        this.bolNew = false;
        this.bolWip = false;
        this.bolComp = true;
        break;
      }
    }
  }


  async GetTaskCat(url, mykey, email) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
    }
    let toDoCat;
    toDoCat = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    return toDoCat;
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
