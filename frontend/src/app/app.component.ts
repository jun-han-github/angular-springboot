import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from './service/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'frontend';

  action_box = false;
  parentTitle?: string;
  parentData?: any;

  authorised = false;

  constructor(
    private events: EventsService,
    private router: Router,
    private location: Location
  ) {
    this.events.subscribe('app:open-action', (data) => {
      this.action_box = data ? true : false;
      if (data) {
        this.parentTitle = data.title;
        this.parentData = data.data;
      }
    });
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  publicPages() {
    const publicPages = ['/login'];
    return publicPages.includes( this.location.path() );
  }

  isAuthenticated() {
    return sessionStorage.getItem('token') ? true : false;
  }

  checkAuth() {
    if (!this.publicPages() && this.isAuthenticated()) {
      this.authorised = true
    } else {
      this.router.navigate(['/login']);
    }
  }
}
