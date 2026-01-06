import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from '../../../entities/product.model';

export interface CartState {
  items: Product[];
}

export const initialState: CartState = { items: [] };

export const cartReducer = createReducer(
  initialState,

  on(CartActions.addItemOptimistic, (state, { product }) => {
    const existing = state.items.find(i => i.id === product.id);
    const items = existing
      ? state.items.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + product.quantity } : i
        )
      : [...state.items, product];
    return { ...state, items };
  }),

  on(CartActions.addItemRollback, (state, { id }) => {
    const existing = state.items.find(i => i.id === id);
    if (!existing) return state;
    const items =
      existing.quantity > 1
        ? state.items.map(i =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        : state.items.filter(i => i.id !== id);
    return { ...state, items };
  }),

  on(CartActions.updateQtyOptimistic, (state, { id, delta }) => {
    const items = state.items.map(i =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    );
    return { ...state, items };
  }),

  on(CartActions.updateQtyRollback, (state, { id, prevQty }) => {
    const items = state.items.map(i =>
      i.id === id ? { ...i, quantity: prevQty } : i
    );
    return { ...state, items };
  }),

  on(CartActions.removeItemOptimistic, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id),
  })),

  on(CartActions.removeItemRollback, (state, { product }) => ({
    ...state,
    items: [...state.items, product],
  })),

  on(CartActions.clearCart, state => ({ ...state, items: [] }))
);