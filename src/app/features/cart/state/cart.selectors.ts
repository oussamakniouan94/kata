import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartCount = createSelector(
  selectCartItems,
  items => items.reduce((sum, i) => sum + (i.quantity ?? 0), 0)
);

export const selectCartSubtotal = createSelector(
  selectCartItems,
  items => items.reduce((sum, i) => sum + i.price * (i.quantity ?? 0), 0)
);
