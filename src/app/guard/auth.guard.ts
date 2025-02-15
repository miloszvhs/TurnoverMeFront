import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data?.['roles'] || [];
  const userRoles = authService.getUserRoles();
  if (userRoles.some(role => expectedRoles.includes(role))) {
    return true;
  }
  router.navigate(['/forbidden']);
  return false;
};
