import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

import * as ProductsActions from './products.actions';
import * as CartActions from '../../cart/state/cart.actions';
import { Product } from 'src/app/entities/product.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsEffects {
  private readonly PRODUCTS_KEY = makeStateKey<Product[]>('products');

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private transferState: TransferState,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() => {
        if (this.transferState.hasKey(this.PRODUCTS_KEY)) {
          const products = this.transferState.get(this.PRODUCTS_KEY, []);
          this.transferState.remove(this.PRODUCTS_KEY);
          return of(ProductsActions.loadProductsSuccess({ products }));
        }

        return this.http.get<Product[]>(environment.apiUrl).pipe(
          map((products) => {
            this.transferState.set(this.PRODUCTS_KEY, products);
            return ProductsActions.loadProductsSuccess({ products });
          }),
          catchError((error) => of(ProductsActions.loadProductsFailure({ error })))
        );
      })
    )
  );

  rateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.rateProduct),
      mergeMap(({ productId, userRate, incrementCount }) => {
        const count = incrementCount ? undefined : undefined;
        return of(ProductsActions.rateProductSuccess({ productId, rate: userRate, count }));
      })
    )
  );

  addToCartToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.addItemOptimistic),
        tap(() => {
          if (isPlatformBrowser(this.platformId)) {
            this.toastr.success('Your product has been added to the cart!');
          }
        })
      ),
    { dispatch: false }
  );

  loadProductsFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.loadProductsFailure),
        tap(({ error }) => {
          if (isPlatformBrowser(this.platformId)) {
            this.toastr.error('Failed to load products. Please try again.', 'Error');
          }
        })
      ),
    { dispatch: false }
  );

  rateProductToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.rateProductSuccess),
        tap(() => {
          if (isPlatformBrowser(this.platformId)) {
            this.toastr.success('Thanks for your rating!');
          }
        })
      ),
    { dispatch: false }
  );
}