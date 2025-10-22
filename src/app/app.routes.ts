import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shop-front/shop-front.routes').then((m) => {
        return m.ShopFrontRoutes;
      }),
  },
];
