import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProductsActions from './products.actions';
import { Product } from 'src/app/entities/product.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.http.get<Product[]>(environment.apiUrl).pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsFailure({ error })))
        )
      )
    )
  );
}