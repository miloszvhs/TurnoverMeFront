import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [
    NgIf,
    ReactiveFormsModule
  ]
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.errorMessage = 'Formularz zawiera błędy.';
      return;
    }

    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      this.errorMessage = 'Nowe hasło i potwierdzenie hasła muszą być takie same.';
      return;
    }

    const { currentPassword, newPassword } = this.changePasswordForm.value;

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.successMessage = 'Hasło zostało zmienione pomyślnie.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd podczas zmiany hasła.';
        console.error(err);
      }
    });
  }
}