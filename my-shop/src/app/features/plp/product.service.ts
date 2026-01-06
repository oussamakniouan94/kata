import { Injectable, inject, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/entities/product.model';

const PRODUCTS_KEY = makeStateKey<Product[]>('products');

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);

  getProducts(): Observable<Product[]> {
    const cached = this.transferState.get(PRODUCTS_KEY, null as any);
    if (cached) {
      return of(cached);
    }

    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      tap(products => this.transferState.set(PRODUCTS_KEY, products))
    );
  }
}
