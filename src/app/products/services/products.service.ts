import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, tap } from 'rxjs';
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

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

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
