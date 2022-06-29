import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskModalComponent implements OnInit {
  selectedMessage: any;
  constructor(
    private DataService: DataService,
  ) { }

  ngOnInit(): void {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
  }

}
