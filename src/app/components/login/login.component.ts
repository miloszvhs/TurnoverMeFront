import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LoginRequest} from '../../models/login-request';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  isMobileMenuOpen = false;

  credentials: LoginRequest = {
    email: '',
    password: ''
  };


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.login(this.credentials).subscribe(() =>{
      console.log('User is logged in');
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.isLoggedIn();
  }
}
