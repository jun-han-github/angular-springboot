import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authLogin:any = {
    username: '',
    password: ''
  }

  image_url = '../../../assets/images/framed_blockie_CM3S5x2447613016217411210145131.png';

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login(email:string, password:string) {
    this.adminService.login({email, password}).subscribe(response => {
      if (response) {
        Swal.fire('Authenticated', `Logged in with ${email}`, 'success');
        sessionStorage.setItem('token', response);
        this.router.navigate(['/']);
        setTimeout(() => {
          Swal.close();
        }, 1500);
      }
    });
  }

}
