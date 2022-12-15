import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  lists = [
    { url: '/', name: 'Employees', icon: 'fas fa-users' },
    { url: '/courses', name: 'Courses', icon: 'fas fa-page' },
    { url: '/notes', name: 'Notes', icon: 'fas fa-book' },
    { url: '/analytics', name: 'Analytics', icon: 'fas fa-graph' },
  ];

  constructor() { }

  ngOnInit(): void {}
}
