import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { MessageService } from 'primeng/api';
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

  myCat: myWebAppCat[];
  webAppName;
  webAppURL;
  SelectedWebCat;
  newWebAppRes;

  SelectedBookmarkCat;
  bookmarkName;
  bookmarkURL;
  newBookmarkRes;

  bolProgressWeb
  bolProgressBookmark

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
        this.bolProgressWeb = true;
        this.bolProgressBookmark = false;
        this.myCat = await this.GetWebAppCategories(this.OktaConfigService.strMyWebAppCategory, this.myKey, this.myEmail);
        console.log(this.myCat);
        this.bolWebsite = true;
        this.bolBookmark = false;

        break;

      }
      case "addBookmark": {
        this.bolProgressWeb = false;
        this.bolProgressBookmark = true;
        this.myCat = await this.GetWebAppCategories(this.OktaConfigService.strMyBookmarkCategory, this.myKey, this.myEmail);
        console.log(this.myCat);
        this.bolBookmark = true;
        this.bolWebsite = false;

        break;
      }
    }
  }

  async SaveBookmark() {
    try {
      this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
      this.myKey = await this.myAccessToken.claims.myKey;
      this.myEmail = await this.myAccessToken.claims.sub;


      this.newBookmarkRes = await this.uploadWebApp(this.OktaConfigService.strAddBookmarkURL, this.myKey, this.myEmail, this.bookmarkName, this.SelectedBookmarkCat.label, this.bookmarkURL);
      console.log(this.newBookmarkRes)

      switch (this.newBookmarkRes.status) {
        case "Bookmark uploaded": {
          this.toastMsg = "Upload Complete";
          this.showSuccess();
          break;
        }
        default: {
          this.showError()
          break;
        }
      }

    } catch {
      this.showError()
    }

  }

  async SaveWebApp() {
    try {
      this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
      this.myKey = await this.myAccessToken.claims.myKey;
      this.myEmail = await this.myAccessToken.claims.sub;

      this.newWebAppRes = await this.uploadWebApp(this.OktaConfigService.strNewWebAppURL, this.myKey, this.myEmail, this.webAppName, this.SelectedWebCat.label, this.webAppURL);

      switch (this.newWebAppRes.status) {
        case "Web app uploaded": {
          this.toastMsg = "Upload Complete";
          this.showSuccess();
          break;
        }
        default: {
          this.showError()
          break;
        }
      }
    }
    catch (error) {
      this.showError()
    }

  }

  async uploadWebApp(url, mykey, email, appName, appCategory, appUri) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
      category: appCategory,
      appname: appName,
      appUri: appUri,

    }

    let newWebApp;
    newWebApp = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    // console.log(newWebApp.status);
    return newWebApp;
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
