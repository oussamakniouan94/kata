import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/entities/product.model';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

export const rateProduct = createAction(
  '[Products] Rate Product',
  props<{ productId: number; userRate: number; incrementCount?: boolean }>()
);

export const rateProductSuccess = createAction(
  '[Products] Rate Product Success',
  props<{ productId: number; rate: number; count?: number }>()
);

export const rateProductFailure = createAction(
  '[Products] Rate Product Failure',
  props<{ error: any }>()
);