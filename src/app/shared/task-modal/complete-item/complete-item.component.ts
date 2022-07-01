import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-complete-item',
  templateUrl: './complete-item.component.html',
  styleUrls: ['./complete-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompleteItemComponent implements OnInit {
  selectedMessage: any;
  constructor(
    private DataService: DataService,
    private messageService: MessageService,
  ) { }

  strItem
  async ngOnInit(){
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.strItem=JSON.stringify(this.selectedMessage)
  }

}
