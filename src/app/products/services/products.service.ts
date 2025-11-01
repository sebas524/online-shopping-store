import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.baseUrl;

  private productsCache = new Map<
    string,
    { data: ProductsResponse; timestamp: number }
  >();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const cacheKey = `limit=${limit}&offset=${offset}&gender=${gender}`;

    const cached = this.productsCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      //* cache valid for 5 minutes
      return of(cached.data);
    }

    return this.http
      .get<ProductsResponse>(`${this.baseUrl}/products`, {
        params: {
          limit: limit,
          offset: offset,
          gender: gender,
        },
      })
      .pipe(
        tap((response) => {
          console.log('Products fetched:', response);
        }),
        tap((response) => {
          //* On first successful fetch for this key, we memoize the response,
          //* so subsequent identical requests are served from memory.
          this.productsCache.set(cacheKey, {
            data: response,
            timestamp: Date.now(),
          });
        })
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
      tap((response) => {
        console.log(`Product ${id} fetched:`, response);
      })
    );
  }
}
