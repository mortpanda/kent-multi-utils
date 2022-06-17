import { Component, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list/menu-list.service';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavMainComponent implements OnInit {
  smallScreen: boolean;
  dockItems;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private MenuListService: MenuListService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.dockItems=this.MenuListService.mainDockItems;
   }

  ngOnInit(): void {
  }

}
