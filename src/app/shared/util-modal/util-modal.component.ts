import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { MessageService } from 'primeng/api';
// import { OktaSDKAuthService } from '../../shared/okta/okta-auth.service';
// import { OktaAuth } from '@okta/okta-auth-js'
import { OktaConfigService } from "../../shared/okta/okta-config.service";
import { OktaApiService } from "../../shared/okta/okta-api.service";
import { OktaGetTokenService } from '../../shared/okta/okta-get-token.service';

interface myWebAppCat {
  label: string,
}

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
  myKey;
  myAccessToken;
  myEmail;

  myWebAppCat: myWebAppCat[];
  webAppName;
  webAppURL;
  SelectedWebCat;

  constructor(
    private DataService: DataService,
    private messageService: MessageService,
    private OktaApiService: OktaApiService,
    public OktaConfigService: OktaConfigService,
    private OktaGetTokenService: OktaGetTokenService,
  ) {
    this.bolWebsite = false;
    this.bolBookmark = false;
  }


  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
    this.myKey = await this.myAccessToken.claims.myKey;
    this.myEmail = await this.myAccessToken.claims.sub;
    switch (this.selectedMessage) {
      case "addWebsites": {
        this.myWebAppCat = await this.GetWebAppCategories(this.OktaConfigService.strMyWebAppCategory, this.myKey, this.myEmail);
        console.log(this.myWebAppCat);


        this.bolWebsite = true;
        this.bolBookmark = false;
        break;
      }
      case "addBookmark": {
        this.bolBookmark = true;
        this.bolWebsite = false;
        break;
      }
    }
  }

async SaveWebApp(){
  
}

  async GetWebAppCategories(url, mykey, email) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
    }
    let strWebAppCat;
    strWebAppCat = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    return strWebAppCat;
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
