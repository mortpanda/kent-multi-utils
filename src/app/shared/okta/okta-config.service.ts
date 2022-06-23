import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OktaConfigService {
  constructor() { }

  //Localhost https://kent-nagao-oie.oktapreview.com
  // strBaseURI = 'https://kent-nagao-oie.oktapreview.com/';
  // strRedirectURL = 'https://192.168.1.100:4200/kent-multi-utils/start/';
  // strClientID = '0oa48xu6hqIHNnvvQ0x7';
  // strIssuer = 'https://kent-nagao-oie.oktapreview.com/oauth2/default/';
  // strPostLogoutURL = 'https://192.168.1.100:4200/kent-multi-utils/';
  // strScope = ['openid', 'email', 'profile', 'address'];
  // strResponseType = ['token', 'id_token'];
  // strResponseMode = 'fragment';
  // strPrompt = 'login';
  // strPkce = true;
  // strLang = 'en';
  // strBrand = '#abd5d6';
  // strLogo = "assets/img/gunmachan.jpg";
  // strMeEP = '/api/v1/users/me';

  strMyBookmarkDownload = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/376dbb4f8f3aa897da118ddbeca0439f/invoke?clientToken=e978e922b0c575989220d3f1f6ab58dfb4d101838e8e5b8467e4c96329d9a32e';

  strAddBookmarkURL = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/c0257ed0fa672adf377938f67f3c025c/invoke?clientToken=9f83c71ee138b7704ec96984a18c62bb07dc823d107f181d39a0f63f5278ac19';

  strNewWebAppURL = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/f066140d60dbfa706917bca22d356db5/invoke?clientToken=56a83d5219430fa4cc762f11cc707c562d130ca07da1adc2ef00ff9887e5d306';

  strMyApps = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/1204b24b6ac85ad98634a2dc0f1b3a25/invoke?clientToken=09b91e7095e6b9c303f96f672c8d49f2c5ff723b0e91cf24be0081e8c87faf91';

  strMyWebsiteURL = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/439a805c4248b81d24da704d697d13df/invoke?clientToken=8ac5ca94a0b9dd81258c4fbf45692836f53a88773b8ef464b8cc50ab22eadc6b';

  strMyWebAppCategory = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/91e7db2628468a341efeede851d3da27/invoke?clientToken=0aeeb0d6bbda8f086311c8c42b6fef57d5201acb63d8ddca655611a8e18eea02';

  strMyBookmarkCategory = 'https://kent-nagao-oie.workflows.oktapreview.com/api/flo/216b19754e9042bd3f4ffdf444612696/invoke?clientToken=5229e72c1c7cf051a3d0f3aaaac282dbc830d7b037cb8e2c709c34c6d13f490e';


  strGitHubRepo = "https://github.com/mortpanda/kent-multi-utils";

  //Git Pages https://kent-nagao-oie.oktapreview.com
  strBaseURI = 'https://kent-nagao-oie.oktapreview.com/';
  strRedirectURL = 'https://mortpanda.github.io/kent-multi-utils/start/';
  strClientID = '0oa48xu6hqIHNnvvQ0x7';
  strIssuer = 'https://kent-nagao-oie.oktapreview.com/oauth2/default/';
  strPostLogoutURL = 'https://mortpanda.github.io/kent-multi-utils/';
  strScope = ['openid', 'email', 'profile', 'address'];
  strResponseType = ['token', 'id_token'];
  strResponseMode = 'fragment';
  strPrompt = 'login';
  strPkce = true;
  strLang = 'en';
  strBrand = '#abd5d6';
  strLogo = "assets/img/gunmachan.jpg";
  strMeEP = '/api/v1/users/me';

}