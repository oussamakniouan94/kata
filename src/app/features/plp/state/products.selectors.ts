import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectProductById = (id: number) =>
  createSelector(selectAllProducts, (products) => products.find((p) => p.id === id));

export const selectProductRating = (id: number) =>
  createSelector(selectProductById(id), (p) => p?.rating ?? { rate: 0, count: 0 });