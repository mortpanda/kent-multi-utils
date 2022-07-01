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
import { MenubarModule } from 'primeng/menubar';
import { StartComponent } from './start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { WebsitesComponent } from './websites/websites.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { AddAppDialComponent } from './shared/add-app-dial/add-app-dial.component';
import { UtilModalComponent } from './shared/util-modal/util-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { TodoComponent } from './todo/todo.component';
import { MatTableModule } from '@angular/material/table';
import { WorldtimeComponent } from './worldtime/worldtime.component';
import { DatePipe } from '@angular/common';
import {DragDropModule} from 'primeng/dragdrop';
import { NewItemComponent } from './shared/task-modal/new-item/new-item.component';
import { WipItemComponent } from './shared/task-modal/wip-item/wip-item.component';
import { CompleteItemComponent } from './shared/task-modal/complete-item/complete-item.component';
import { AddTaskComponent } from './shared/task-modal/add-task/add-task.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavMainComponent,
    ToolbarComponent,
    StartComponent,
    WebsitesComponent,
    AddAppDialComponent,
    UtilModalComponent,
    BookmarksComponent,
    TodoComponent,
    WorldtimeComponent,
    NewItemComponent,
    WipItemComponent,
    CompleteItemComponent,
    AddTaskComponent,
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
    ToastModule,
    TabViewModule,
    MatDialogModule,
    FormsModule,
    InputTextModule,
    DividerModule,
    ProgressBarModule,
    DropdownModule,
    MatTableModule,
    DragDropModule,

  ],
  providers: [HttpClientModule,
    MessageService,
    UtilModalComponent,
    DatePipe,
    NewItemComponent,
    WipItemComponent,
    CompleteItemComponent,
    AddTaskComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
