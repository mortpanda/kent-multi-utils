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
  myToDoList = [];


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

  // itemList = [
  //   {
  //     category: 'customer',
  //     subject: 'test',
  //     description: 'this is a test'
  //   },
  //   {
  //     category: 'customer 2',
  //     subject: 'test 2',
  //     description: 'this is a test 2'
  //   },
  // ]


  async GetMyToDo(url, mykey, email) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
    }
    var arrTodo;
    arrTodo = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    return arrTodo;
  }



  test() {
    alert('test')
  }

  arrWIP = [];
  arrCompleted = [];
  dragedTask = null;

  dragStart(e, item) {
    this.dragedTask = item;
  }


  dragEnd(e) {
    this.dragedTask = null;
  }


  toNew(e) {
    if (this.dragedTask) {
      switch (this.myToDoNew.includes(this.dragedTask)) {
        case true: {
          break;
        }
        case false: {
          switch (this.myToDoWIP.includes(this.dragedTask)) {
            case true: {
              this.myToDoWIP.splice(this.myToDoWIP.indexOf(this.dragedTask), 1);

              this.myToDoNew.push(this.dragedTask);
              this.dragedTask = null;
              break;
            }
            case false: {
              this.myToDoComplete.splice(this.myToDoComplete.indexOf(this.dragedTask), 1);
              this.myToDoNew.push(this.dragedTask);
              this.dragedTask = null;
              break;
            }
          };
          break;
        }
      }
    }
  }

  toWIP(e) {
    if (this.dragedTask) {
      switch (this.myToDoWIP.includes(this.dragedTask)) {
        case true: {
          break;
        }
        case false: {
          switch (this.myToDoNew.includes(this.dragedTask)) {
            case true: {
              this.myToDoNew.splice(this.myToDoNew.indexOf(this.dragedTask), 1);
              this.myToDoWIP.push(this.dragedTask);
              this.dragedTask = null;
              break;
            }
            case false: {
              this.myToDoComplete.splice(this.myToDoComplete.indexOf(this.dragedTask), 1);
              this.myToDoWIP.push(this.dragedTask);
              this.dragedTask = null;
              break;
            }
          };
          break;
        }
      }
    }
  }

  toCompleted(e) {
    if (this.dragedTask) {
      switch (this.myToDoComplete.includes(this.dragedTask)) {
        case true: {
          break;
        }
        case false: {
          switch (this.myToDoWIP.includes(this.dragedTask)) {
            case true: {
              this.myToDoWIP.splice(this.myToDoWIP.indexOf(this.dragedTask), 1);
              this.myToDoComplete.push(this.dragedTask);
              this.dragedTask = null;
              break;
            }
            case false: {
              this.myToDoNew.splice(this.myToDoNew.indexOf(this.dragedTask), 1);
              this.myToDoComplete.push(this.dragedTask);
              this.dragedTask = null;
              break;
            }
          };
          this.dragedTask = null;
          break;
        }
      }

    }
  }

myTest(item){
  console.log(item)

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
        this.myToDoList = await this.GetMyToDo(this.OktaConfigService.strMyToDoDownload, this.myKey, this.myEmail)
        await console.log(this.myToDoList)
        await this.processToDo(this.myToDoList)
        break;

    }
    console.log(this.strThisUser);

  }



  myToDoNew = [];
  myToDoWIP = [];
  myToDoComplete = [];
  async processToDo(arrList) {
    for (var i = 0; i < arrList.length; i++) {
      switch (arrList[i].status) {
        case "new": {
          this.myToDoNew.push(arrList[i]);
          break;
        }
        case "wip": {
          this.myToDoWIP.push(arrList[i]);
          break;
        }
        case "complete": {
          this.myToDoComplete.push(arrList[i])
          break;
        }

      }
    }
    console.log(this.myToDoNew)
  }


}
