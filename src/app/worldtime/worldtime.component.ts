import { Component, OnInit } from '@angular/core';
import {WorldClockService} from '../shared/world-clock/world-clock.service';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OktaGetTokenService } from '../shared/okta/okta-get-token.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaConfigService } from "../shared/okta/okta-config.service";
import { GetGeolocationService } from '../shared/geolocation/geolocation.service';
import { GetWeatherService } from '../shared/weather/get-weather.service';
import { DataService } from '../shared/data-service/data.service';


@Component({
  selector: 'app-worldtime',
  templateUrl: './worldtime.component.html',
  styleUrls: ['./worldtime.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorldtimeComponent implements OnInit {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  strFullName;
  constructor(
    private WorldClockService:WorldClockService,
    private breakpointObserver: BreakpointObserver,
    public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public OktaConfigService: OktaConfigService,
    public GetGeolocationService: GetGeolocationService,
    public GetWeatherService: GetWeatherService,
    private DataService: DataService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
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
        await this.WorldClockService.GetWorldTime();
        
        break;
    }
    console.log(this.strThisUser)

  }

}
