import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { ImageCarouselComponent } from '../../../shared/components/image-carousel/image-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [ImageCarouselComponent, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productId = this.activatedRoute.snapshot.params['id'];

  productResource = rxResource({
    request: () => ({
      id: this.productId,
    }),
    loader: ({ request }) => {
      return this.productsService.getProductById(request.id);
    },
  });
}
