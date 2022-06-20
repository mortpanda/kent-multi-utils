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


@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebsitesComponent implements OnInit {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  strFullName;
  mainAppMenu = [];
  selectedMessage: any;
  myKey;
  myAccessToken;
  myEmail;

  myTemp;
  myLocation;
  myWeather;
  mySites: boolean;
  myWebsites;
  myCategories;
  myAPIStatus;
  GetWebsiteStatus;
  toastMsg;

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
    this.mainAppMenu = this.MenuListService.mainAppMenu;
    this.mySites = false;
  }


  async ngOnInit() {
    await this.GetGeolocationService.GetGeo();


    this.strUserSession = await this.authService.isAuthenticated();
    console.log(this.strUserSession)
    switch (this.strUserSession == true) {
      case false:
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
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
        this.myWebsites = await this.GetMyWebsites(this.OktaConfigService.strMyWebsiteURL, this.myKey, this.myEmail)
        console.log(this.myWebsites);
        this.GetWebsiteStatus = await this.OktaApiService.processApiResponse(this.myWebsites);
        await console.log(this.GetWebsiteStatus);

        switch (this.GetWebsiteStatus) {
          case "SUCCESS": {
            this.toastMsg = "Websites Downloaded";
            this.showSuccess();
            //here
            await this.processWebSites(this.myWebsites);
            break;
          }
          case "FAILURE": {
            this.toastMsg = "FAILED";
            this.showError();
            break;
          }
        }



        this.mySites = true;
        break;

    }
    console.log(this.strThisUser);
    console.log(this.myKey);

  }

  myOieuApps = [];
  DevInfo = [];
  Klab = [];
  websiteOkta = [];
  userDashboard = [];
  adminDashboard = [];
  dailySites = [];

  async processWebSites(arrWebsites) {
    var intOIE = 0;
    var intDevInfo = 0;
    var intKlab = 0;
    var intOktaSites = 0;
    var intUserDash = 0;
    var intAdminDash = 0;
    var intDaly = 0;
    for (var i = 0; i < arrWebsites.length; i++) {

      switch (arrWebsites[i].websiteCategory) {
        case "My OIE Project Apps": {
          //myOiuApps

          this.myOieuApps[intOIE] = ({
            name: arrWebsites[i].websiteName,
            strUri: arrWebsites[i].websiteURL,
            strCat: arrWebsites[i].websiteCategory,
          })
          intOIE++
          break;
        }
        case "Dev Info": {
          //DevInfo
          this.DevInfo[intDevInfo] = ({
            name: arrWebsites[i].websiteName,
            strUri: arrWebsites[i].websiteURL,
            strCat: arrWebsites[i].websiteCategory,
          })
          intDevInfo++
          break;
        }
        case "KLab Sites": {
          //Klab
          this.Klab[intKlab] = ({
            name: arrWebsites[i].websiteName,
            strUri: arrWebsites[i].websiteURL,
            strCat: arrWebsites[i].websiteCategory,
          })
          intKlab++
          break;
        }
        case "Okta Websites": {
          //websiteOkta
          this.websiteOkta[intOktaSites] = ({
            name: arrWebsites[i].websiteName,
            strUri: arrWebsites[i].websiteURL,
            strCat: arrWebsites[i].websiteCategory,
          })
          intOktaSites++
          break;
        }
        case "User Dashboards": {
          //userDashboard
          this.userDashboard[intUserDash] = ({
            name: arrWebsites[i].websiteName,
            strUri: arrWebsites[i].websiteURL,
            strCat: arrWebsites[i].websiteCategory,
          })
          intUserDash++
          break;
        }
        case "Admin Dashboards": {
          //adminDashboard
          this.adminDashboard[intAdminDash] = ({
            name: arrWebsites[i].websiteName,
            strUri: arrWebsites[i].websiteURL,
            strCat: arrWebsites[i].websiteCategory,
          })
          intAdminDash++
          break;
        }
        case "Daily Websites": {
          //dailySites
          this.dailySites[intDaly] = ({
            name: arrWebsites[i].websiteName,
            strUri: arrWebsites[i].websiteURL,
            strCat: arrWebsites[i].websiteCategory,
          })
          intDaly++
          break;
        }

      }


    }
    console.log(this.myOieuApps)
    console.log(this.DevInfo)
    console.log(this.Klab)
    console.log(this.websiteOkta)
    console.log(this.userDashboard)
    console.log(this.adminDashboard)
    console.log(this.dailySites)
  }

  async GetMyWebsites(url, mykey, email) {
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

  async OpenWebsite(url) {
    await window.open(url, '_blank');

  }


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

