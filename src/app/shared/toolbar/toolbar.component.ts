import { Component, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list/menu-list.service';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  smallScreen: boolean;
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
    
   }

  ngOnInit(): void {
  }

}
