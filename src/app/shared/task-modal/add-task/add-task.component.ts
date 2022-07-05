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
  selectedCategory;

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

  async SaveTaskToOkta(url, mykey, email, taskType, taskTitle, taskNotes) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
      taskType: taskType,
      taskTitle: taskTitle,
      taskNotes: taskNotes,
      strCategory: this.selectedCategory.toDoCategories,
    }
    var adddTaskRes;
    adddTaskRes = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    return adddTaskRes;
  }

  myActionType;
  myAddTaskRes;
  async saveTask(taskType) {
    this.myActionType = await taskType.replace(/['"]+/g, '');
    console.log(this.myActionType)
    this.myAddTaskRes = await this.SaveTaskToOkta(this.OktaConfigService.strMyTaskAddURL, this.myKey, this.myEmail, taskType, this.taskTitle, this.taskNotes);
    await console.log(this.myAddTaskRes.status);
    switch (this.myAddTaskRes.status) {
      case "Task created": {
        this.toastMsg = "Task Created"
        await this.showSuccess();
        await window.location.replace('/todo')
        break;
      }
      default: {
        this.showError()
        break;
      }
    }
  }

  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.myTaskType = this.selectedMessage;

    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
    this.myKey = await this.myAccessToken.claims.myKey;
    this.myEmail = await this.myAccessToken.claims.sub;
    this.arrDownloadedTaskCat = await this.GetTaskCat(this.OktaConfigService.strMyToDoCatDownload, this.myKey, this.myEmail);
    console.log(this.arrDownloadedTaskCat);

    switch (this.arrDownloadedTaskCat.length > 0) {
      case true: {
        this.toastMsg = "Downloaded Categories"
        this.showSuccess();
        break;
      }
      case false: {
        this.toastMsg = "Failed to download Category data"
        this.showError()
        break;
      }
    }

    switch (this.myTaskType) {
      case 'new': {
        this.bolNew = true;
        this.bolWip = false;
        this.bolComp = false;
        break;
      }
      case 'wip': {
        this.bolNew = false;
        this.bolWip = true;
        this.bolComp = false;
        break;
      }
      case 'complete': {
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
