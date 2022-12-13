import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username?: String;
  password?: String;
  image_url = '../../../assets/images/framed_blockie_CM3S5x2447613016217411210145131.png';

  constructor() { }

  ngOnInit(): void {
  }

}
