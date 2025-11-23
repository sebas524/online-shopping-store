import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-shop-front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './shop-front-navbar.component.html',
  styleUrl: './shop-front-navbar.component.css',
})
export class ShopFrontNavbarComponent {
  authService = inject(AuthService);
}
