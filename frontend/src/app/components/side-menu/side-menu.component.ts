import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  lists = [
    { url: '/', name: 'Employees', icon: 'fas fa-users' },
    { url: '/second-page', name: 'Second Page', icon: 'fas fa-wallet' },
    { url: '/third-page', name: 'Third Page', icon: 'fas fa-book' },
    { url: '/fourth-page', name: 'Fourth Page', icon: 'fas fa-tasks' },
  ];

  constructor() { }

  ngOnInit(): void {}
}
