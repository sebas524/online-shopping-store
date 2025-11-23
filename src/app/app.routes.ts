import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => {
        return m.authRoutes;
      }),

    canMatch: [
      NotAuthenticatedGuard,
      () => {
        console.log('hello from guard in auth app routes');
      },
    ],
  },

  {
    path: '',
    loadChildren: () =>
      import('./shop-front/shop-front.routes').then((m) => {
        return m.ShopFrontRoutes;
      }),
  },
];
