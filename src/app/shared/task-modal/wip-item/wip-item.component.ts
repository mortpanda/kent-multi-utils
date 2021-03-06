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
  selectedInt: number,
}
@Component({
  selector: 'app-wip-item',
  templateUrl: './wip-item.component.html',
  styleUrls: ['./wip-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WipItemComponent implements OnInit {
  selectedMessage: any;
  bolLoaded: boolean;
  constructor(
    private DataService: DataService,
    private messageService: MessageService,
    private OktaApiService: OktaApiService,
    public OktaConfigService: OktaConfigService,
    private OktaGetTokenService: OktaGetTokenService,
  ) {
    this.bolLoaded = false;
  }


  strItem;
  strItemSubject;
  strItemDesc;

  myKey;
  myAccessToken;
  myEmail;
  arrDownloadedTaskCat;
  addTaskSelectedCat: myTaskCat[];
  selectedCategory;
  newTaskCat;
  itemUpdateRes;
  selectedInt;

  async ngOnInit() {
    await this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
    this.myKey = await this.myAccessToken.claims.myKey;
    this.myEmail = await this.myAccessToken.claims.sub;

    this.arrDownloadedTaskCat = await this.GetTaskCat(this.OktaConfigService.strMyToDoCatDownload, this.myKey, this.myEmail);

    console.log(this.arrDownloadedTaskCat)

    this.strItem = await this.selectedMessage;
    this.strItemSubject = await this.strItem.subject;
    this.strItemDesc = await this.strItem.description;

    
    for (let i = 0; i < await this.arrDownloadedTaskCat.length; i++) {
      switch (await this.arrDownloadedTaskCat[i].toDoCategories) {
        case await this.strItem.category: {
          this.selectedInt = await i;
          this.newTaskCat = this.arrDownloadedTaskCat[i].toDoCategories;
          this.bolLoaded = true;
          break;
        }
        default: {
          break;
        }
      }

    }

  }

  changeCat(index) {
    console.log(this.arrDownloadedTaskCat[index])
    this.newTaskCat = this.arrDownloadedTaskCat[index].toDoCategories
  }


  async updateTask() {
    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
    this.myKey = await this.myAccessToken.claims.myKey;
    this.myEmail = await this.myAccessToken.claims.sub;


    this.itemUpdateRes = await this.taskUpdate(this.OktaConfigService.strUpdateTaskContentURL, this.myKey, this.myEmail, this.strItem["Row ID"], this.strItemSubject, this.strItemDesc, this.newTaskCat),
      console.log(this.itemUpdateRes)

    switch (this.itemUpdateRes.status) {
      case "Task Updated": {
        this.toastMsg = "Task updated"
        this.showSuccess()
        break;
      }
      default: {
        this.toastMsg = "Error updating task"
        this.showError()
        break;
      }
    }
    await window.location.replace('/todo')
  }


  async taskUpdate(url, mykey, email, rowId, sub, description, cat) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
      rowId: rowId,
      sub: sub,
      description: description,
      cat: cat,

    }

    let taskUpdateRes;
    taskUpdateRes = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    // console.log(newWebApp.status);
    return taskUpdateRes;
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
