import { Routes } from '@angular/router';
import { ShopFrontLayoutComponent } from './layouts/shop-front-layout/shop-front-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SexPageComponent } from './pages/sex-page/sex-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const ShopFrontRoutes: Routes = [
  {
    path: '',
    component: ShopFrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'sex/:sex',
        component: SexPageComponent,
      },
      { path: 'product/:id', component: ProductPageComponent },
      {
        path: '**',
        loadComponent: () => {
          return import('./pages/not-found-page/not-found-page.component').then(
            (m) => {
              return m.NotFoundPageComponent;
            }
          );
        },
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
