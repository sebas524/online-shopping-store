import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';

@Component({
  selector: 'app-sex-page',
  imports: [ProductCardComponent],
  templateUrl: './sex-page.component.html',
  styleUrl: './sex-page.component.css',
})
export class SexPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  router = inject(Router);

  // ! sex:
  sex = toSignal(
    this.activatedRoute.params.pipe(
      map((params) => {
        return params['sex'];
      })
    )
  );

  productsResource = rxResource({
    request: () => this.sex(), // <-- dependency
    loader: ({ request: currentSex }) => {
      // Map URL segment to API gender values
      let gender: string;
      switch (currentSex) {
        case 'men':
          gender = 'men';
          break;
        case 'women':
          gender = 'women';
          break;
        case 'kids':
        case 'kid':
          gender = 'kid';
          break;
        case 'unisex':
          gender = 'unisex';
          break;
        default:
          gender = 'unisex';
      }

      return this.productsService.getProducts({ gender });
    },
  });
}
