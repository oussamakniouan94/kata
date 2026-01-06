import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { timer, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

export const addItemEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(CartActions.addItemOptimistic),
      mergeMap(({ product }) =>
        timer(300).pipe(
          map(() =>
            Math.random() < 0.85
              ? CartActions.addItemConfirm({ id: product.id })
              : CartActions.addItemRollback({ id: product.id, reason: 'Network error' })
          )
        )
      )
    ),
  { functional: true }
);
