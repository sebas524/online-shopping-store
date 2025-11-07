import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => {
        return m.authRoutes;
      }),
  },

  {
    path: '',
    loadChildren: () =>
      import('./shop-front/shop-front.routes').then((m) => {
        return m.ShopFrontRoutes;
      }),
  },
];
