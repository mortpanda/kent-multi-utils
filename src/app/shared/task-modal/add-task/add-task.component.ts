import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent implements OnInit {
  selectedMessage: any;
  strTaskType;
  constructor(
    private DataService: DataService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.strTaskType = this.selectedMessage;

    switch (this.strTaskType) {
      case 'addNew': {
        alert('new')
        break;
      }
      case 'addWIP': {
        alert('addWIP')
        break;
      }
      case 'addComplete': {
        alert('addComplete')
        break;
      }
    }
  }

}
