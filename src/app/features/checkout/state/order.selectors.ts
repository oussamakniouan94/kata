import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectOrderLoading = createSelector(
    selectOrderState,
    state => state ? state.loading : false
);

export const selectOrderSuccess = createSelector(
    selectOrderState,
    state => state ? state.success : false
);

export const selectOrderError = createSelector(
    selectOrderState,
    state => state ? state.error : null
);

export const selectOrderId = createSelector(
    selectOrderState,
    state => state ? state.orderId : null
);