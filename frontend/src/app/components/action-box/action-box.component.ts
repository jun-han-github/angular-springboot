import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EventsService } from 'src/app/service/events.service';

@Component({
  selector: 'action-box',
  templateUrl: './action-box.component.html',
  styleUrls: ['./action-box.component.css']
})
export class ActionBoxComponent implements OnInit {

  @Input() title?: string;
  @Input() childData?: any;
  error = false;

  constructor(
    private events: EventsService
  ) { }

  ngOnInit(): void {
  }



  closeActionBox() {
    this.events.publish('app:open-action', null);
  }

  onUpdateForm(data?: any): void {
    console.log(data.value);
  }
}
