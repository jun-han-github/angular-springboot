import { Component } from '@angular/core';
import { EventsService } from './service/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';

  action_box = false;
  parentTitle?: string;
  parentData?: any;

  constructor(
    private events: EventsService
  ) {
    this.events.subscribe('app:open-action', (data) => {
      this.action_box = data ? true : false;
      if (data) {
        this.parentTitle = data.title;
        this.parentData = data.data;
      }
    });
  }
}
