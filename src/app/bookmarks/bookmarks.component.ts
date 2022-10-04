import { Component, OnInit } from '@angular/core';
import { OktaGetTokenService } from '../shared/okta/okta-get-token.service';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaConfigService } from "../shared/okta/okta-config.service";
import { OktaWidgetService } from '../shared/okta/okta-widget.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuListService } from '../shared/menu-list/menu-list.service';
import { GetGeolocationService } from '../shared/geolocation/geolocation.service';
import { GetWeatherService } from '../shared/weather/get-weather.service';
import { DataService } from '../shared/data-service/data.service';
import { OktaApiService } from '../shared/okta/okta-api.service';
import { MessageService } from 'primeng/api';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookmarksComponent implements OnInit {

  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  strFullName;
  myKey;
  myAccessToken;
  myEmail;

  myBookmarks: boolean;
  myBookmarkRes;
  myBookmarkCols: string[] = ['description', 'category', 'siteURL'];
  myTableSource;

  constructor(
    private OktaGetTokenService: OktaGetTokenService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
    private OktaWidgetService: OktaWidgetService,
    private breakpointObserver: BreakpointObserver,
    private MenuListService: MenuListService,
    public GetGeolocationService: GetGeolocationService,
    public GetWeatherService: GetWeatherService,
    private DataService: DataService,
    private OktaApiService: OktaApiService,
    private messageService: MessageService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    // this.mainAppMenu = this.MenuListService.mainAppMenu;
    // this.mySites = false;
    this.myBookmarks = false;
  }

  async ngOnInit() {
    await this.GetGeolocationService.GetGeo();

    this.strUserSession = await this.authService.isAuthenticated();
    console.log(this.strUserSession)
    switch (this.strUserSession == true) {
      case false:
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:{
        this.strThisUser = await this.authService.token.getUserInfo()
          .then(function (user) {
            return user
          })
          .catch((err) => {
            console.log(err);
            window.location.replace(this.OktaConfigService.strPostLogoutURL);
          })
        this.strFullName = await this.strThisUser.name;
        this.myAccessToken = await this.OktaGetTokenService.GetAccessToken()
        this.myKey = await this.myAccessToken.claims.myKey;
        this.myEmail = await this.myAccessToken.claims.sub;
        this.myBookmarkRes = await this.GetMyBookmarks(this.OktaConfigService.strMyBookmarkDownload, this.myKey, this.myEmail)
        
        this.myTableSource = new MatTableDataSource(this.myBookmarkRes);
        switch (this.myBookmarkRes.length > 0) {
          case true: {
            this.showSuccess()
            break;
          }
          case false: {
            this.showError()
            break;
          }
        }
        this.myBookmarks = true;
        break;
      }
    }
    // console.log(this.strThisUser);
    console.log(this.myBookmarkRes);

  }

  async GetMyBookmarks(url, mykey, email) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
    }
    var strWebsites;
    strWebsites = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    return strWebsites;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myTableSource.filter = filterValue.trim().toLowerCase();
  }

  itemRow;
  openProduct(row): void {
    // let dialogRef = this.dialog.open(OrderDetailsComponent, {
    //   // width: '800px', height: 'auto',
    //   data: { row },
    // });

    // dialogRef.afterClosed().subscribe(result => { row = result; });
    this.itemRow = row;
    console.log(this.itemRow)
    this.DataService.changeMessage(this.itemRow);
  }

}



