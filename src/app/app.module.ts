import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingComponent } from './landing/landing.component';
import { NavMainComponent } from './shared/nav-main/nav-main.component';
import { DockModule } from 'primeng/dock';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { PrimeIcons } from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import { StartComponent } from './start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { WebsitesComponent } from './websites/websites.component';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavMainComponent,
    ToolbarComponent,
    StartComponent,
    WebsitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DockModule,
    ButtonModule,
    SpeedDialModule,
    TooltipModule,
    ToolbarModule,
    MenubarModule,
    HttpClientModule,
    PanelModule,
    CardModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
