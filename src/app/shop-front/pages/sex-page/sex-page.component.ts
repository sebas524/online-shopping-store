import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { PaginationService } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-sex-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './sex-page.component.html',
  styleUrl: './sex-page.component.css',
})
export class SexPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

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
    request: () => ({
      currentSex: this.sex(),
      page: this.paginationService.currentPage() - 1,
    }), // <-- dependency
    loader: ({ request }) => {
      // Map URL segment to API gender values
      let gender: string;
      switch (request.currentSex) {
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

      return this.productsService.getProducts({
        gender,
        offset: request.page * 9,
      });
    },
  });
}
