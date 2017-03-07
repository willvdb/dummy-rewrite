import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

	constructor(private loginService: LoginService, private router: Router) {}

    onSubmit(email, password) {
      this.loginService.login(email, password).subscribe((result) => {
        if (result) {
          this.router.navigate(['']);
        }
      });

  	}
}
