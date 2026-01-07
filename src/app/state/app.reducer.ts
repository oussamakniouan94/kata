import { ActionReducerMap } from '@ngrx/store';
import { CartState, cartReducer } from '../features/cart/state/cart.reducer';
import { ProductsState, productsReducer } from '../features/plp/state/products.reducer';
import { OrderState, orderReducer } from '../features/checkout/state/order.reducer';

export interface AppState {
  cart: CartState;
  products: ProductsState;
  order: OrderState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  products: productsReducer,
  order: orderReducer,
};
