import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { of, timer } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

function simulateApi(successRate = 0.85, delayMs = 300) {
  return timer(delayMs).pipe(
    mergeMap(() => (Math.random() < successRate ? of(true) : of(false)))
  );
}

export const cartEffects = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(CartActions.addItemOptimistic),
      mergeMap(({ product }) =>
        simulateApi().pipe(
          map(ok =>
            ok
              ? CartActions.addItemConfirm({ id: product.id })
              : CartActions.addItemRollback({ id: product.id, reason: 'Network error' })
          )
        )
      )
    )
);