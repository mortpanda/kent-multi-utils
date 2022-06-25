import { Component, OnInit } from '@angular/core';
import { OktaGetTokenService } from '../shared/okta/okta-get-token.service';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaConfigService } from "../shared/okta/okta-config.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuListService } from '../shared/menu-list/menu-list.service';
import { GetGeolocationService } from '../shared/geolocation/geolocation.service';
import { GetWeatherService } from '../shared/weather/get-weather.service';
import { DataService } from '../shared/data-service/data.service';
import { OktaApiService } from '../shared/okta/okta-api.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  strFullName;
  myKey;
  myAccessToken;
  myEmail;
  
  constructor(
    private OktaGetTokenService: OktaGetTokenService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
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
  }

  itemList = [
    {
     category:'customer',
     subject:'test',
     description:'this is a test'
    },
    {
      category:'customer 2',
      subject:'test 2',
      description:'this is a test 2'
     },
  ]

  // itemDropped=[]; 
  // draggeditem=null;

  

  // colors = ['red', 'green', 'white'];

  droped = [];

  dragedColor = null;

  dragStart(e, c) {
    this.dragedColor = c;
  }

  dragEnd(e) {
  }

  drop(e) {
    if (this.dragedColor) {
      this.droped.push(this.dragedColor);
      this.dragedColor = null;
    }
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
        

        break;

    }
    console.log(this.strThisUser);

  }



 

}
