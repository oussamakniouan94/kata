import { createAction, props } from '@ngrx/store';
import { Product } from '../../../entities/product.model';

export const placeOrder = createAction(
    '[Order] Place Order',
    props<{ items: Product[]; total: number }>()
);

export const placeOrderSuccess = createAction(
    '[Order] Place Order Success',
    props<{ orderId: string }>()
);

export const placeOrderFailure = createAction(
    '[Order] Place Order Failure',
    props<{ error: any }>()
);