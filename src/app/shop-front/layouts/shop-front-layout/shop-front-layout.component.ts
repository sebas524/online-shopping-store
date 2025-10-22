import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopFrontNavbarComponent } from '../../components/shop-front-navbar/shop-front-navbar.component';

@Component({
  selector: 'app-shop-front-layout',
  imports: [RouterOutlet, ShopFrontNavbarComponent],
  templateUrl: './shop-front-layout.component.html',
  styleUrl: './shop-front-layout.component.css',
})
export class ShopFrontLayoutComponent {}
