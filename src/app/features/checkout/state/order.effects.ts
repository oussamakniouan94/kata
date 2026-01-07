import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { delay, map, mergeMap, catchError } from 'rxjs/operators';
import * as OrderActions from './order.actions';
import * as CartActions from '../../cart/state/cart.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.placeOrder),
      mergeMap(action =>
        of({ orderId: Math.random().toString(36).substring(2, 9) }).pipe(
          delay(1500),
          map(result => OrderActions.placeOrderSuccess({ orderId: result.orderId })),
          catchError(error => of(OrderActions.placeOrderFailure({ error })))
        )
      )
    )
  );

  clearCartOnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.placeOrderSuccess),
      map(() => CartActions.clearCart())
    )
  );
}
