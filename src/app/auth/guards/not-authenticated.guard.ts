import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('NotAuthenticatedGuard - Checking auth status');

  const authService = inject(AuthService);

  const router = inject(Router);
  // * why router? because if user is not
  // * authenticated we need to get him out of that specific route

  const isAuthenticated = await firstValueFrom(authService.checkStatus());

  console.log('NotAuthenticatedGuard - isAuthenticated:', isAuthenticated);

  if (isAuthenticated) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
