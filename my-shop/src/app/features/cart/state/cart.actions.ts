import { createAction, props } from '@ngrx/store';
import { Product } from '../../../entities/product.model';

export const addItemOptimistic = createAction(
  '[Cart] Add Item Optimistic',
  props<{ product: Product }>()
);

export const addItemConfirm = createAction(
  '[Cart] Add Item Confirm',
  props<{ id: number }>()
);

export const addItemRollback = createAction(
  '[Cart] Add Item Rollback',
  props<{ id: number; reason: string }>()
);

export const updateQtyOptimistic = createAction(
  '[Cart] Update Qty Optimistic',
  props<{ id: number; delta: number }>()
);

export const updateQtyConfirm = createAction(
  '[Cart] Update Qty Confirm',
  props<{ id: number }>()
);

export const updateQtyRollback = createAction(
  '[Cart] Update Qty Rollback',
  props<{ id: number; prevQty: number; reason: string }>()
);

export const removeItemOptimistic = createAction(
  '[Cart] Remove Item Optimistic',
  props<{ id: number }>()
);

export const removeItemConfirm = createAction(
  '[Cart] Remove Item Confirm',
  props<{ id: number }>()
);

export const removeItemRollback = createAction(
  '[Cart] Remove Item Rollback',
  props<{ product: Product; reason: string }>()
);

export const clearCart = createAction('[Cart] Clear');
