import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OktaConfigService {
  constructor() { }

  //Localhost https://kent-nagao-oie.oktapreview.com
  strBaseURI = 'https://kent-nagao-oie.oktapreview.com/';
  strRedirectURL = 'https://192.168.1.100:4200/kent-multi-utils/start/';
  strClientID = '0oa48xu6hqIHNnvvQ0x7';
  strIssuer = 'https://kent-nagao-oie.oktapreview.com/oauth2/default/';
  strPostLogoutURL = 'https://192.168.1.100:4200/kent-multi-utils/';
  strScope = ['openid', 'email', 'profile', 'address'];
  strResponseType = ['token', 'id_token'];
  strResponseMode = 'fragment';
  strPrompt = 'login';
  strPkce = true;
  strLang = 'en';
  strBrand = '#abd5d6';
  strLogo = "assets/img/gunmachan.jpg";
  strMeEP = '/api/v1/users/me';

  strMyApps = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/1204b24b6ac85ad98634a2dc0f1b3a25/invoke?clientToken=09b91e7095e6b9c303f96f672c8d49f2c5ff723b0e91cf24be0081e8c87faf91';

  strMyWebsiteURL = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/439a805c4248b81d24da704d697d13df/invoke?clientToken=8ac5ca94a0b9dd81258c4fbf45692836f53a88773b8ef464b8cc50ab22eadc6b';

  strMyWebAppCategory = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/91e7db2628468a341efeede851d3da27/invoke?clientToken=0aeeb0d6bbda8f086311c8c42b6fef57d5201acb63d8ddca655611a8e18eea02';


  strGitHubRepo = "https://github.com/mortpanda/my-apps-launcher-v2";

  //Git Pages https://kent-nagao-oie.oktapreview.com
  // strBaseURI = 'https://kent-nagao-oie.oktapreview.com/';
  // strRedirectURL = 'https://mortpanda.github.io/kent-org-user-group-add/add/';
  // strClientID = '0oa47buceiGBGd8bj0x7';
  // strIssuer = 'https://kent-nagao-oie.oktapreview.com/oauth2/default/';
  // strPostLogoutURL = 'https://mortpanda.github.io//kent-org-user-group-add/';
  // strScope = ['openid', 'email', 'profile', 'address'];
  // strResponseType = ['token', 'id_token'];
  // strResponseMode = 'fragment';
  // strPrompt = 'login';
  // strPkce = true;
  // strLang = 'en';
  // strBrand = '#abd5d6';
  // strLogo = "assets/img/gunmachan.jpg";
  // strMeEP = '/api/v1/users/me';
  // strAddUrl = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/3caa2f66e45159df4070986a2cec55e4/invoke?clientToken=570a455593ea07870f7622bdea0e6b9b6c92387207b3a6cb48ba8ac932c37c16';


  // strGitHubRepo = "https://github.com/mortpanda/my-apps-launcher-v2";


}