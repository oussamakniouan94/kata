import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';

export interface OrderState {
  loading: boolean;
  success: boolean;
  error: any;
  orderId: string | null;
}

export const initialState: OrderState = {
  loading: false,
  success: false,
  error: null,
  orderId: null
};

export const orderReducer = createReducer(
  initialState,

  on(OrderActions.placeOrder, state => ({
    ...state,
    loading: true,
    success: false,
    error: null,
    orderId: null
  })),

  on(OrderActions.placeOrderSuccess, (state, { orderId }) => ({
    ...state,
    loading: false,
    success: true,
    error: null,
    orderId
  })),

  on(OrderActions.placeOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error,
    orderId: null
  }))
);