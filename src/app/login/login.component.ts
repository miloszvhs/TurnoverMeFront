import { Component } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void{
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }
}
