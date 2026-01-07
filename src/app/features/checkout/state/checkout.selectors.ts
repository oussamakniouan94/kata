import { selectCartItems, selectCartCount, selectCartSubtotal } from '../../cart/state/cart.selectors';

export const selectCheckoutItems = selectCartItems;

export const selectCheckoutCount = selectCartCount;

export const selectCheckoutTotal = selectCartSubtotal;
