import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shop-front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './shop-front-navbar.component.html',
  styleUrl: './shop-front-navbar.component.css',
})
export class ShopFrontNavbarComponent {}
