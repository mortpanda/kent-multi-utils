import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { StartComponent } from './start/start.component';
import { WebsitesComponent } from './websites/websites.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TodoComponent } from './todo/todo.component';
import { WorldtimeComponent } from './worldtime/worldtime.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'start', component: StartComponent },
  { path: 'websites', component: WebsitesComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'worldtime', component: WorldtimeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
