import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product.model';
import { CartState } from '../state/cart.reducer';
import * as CartActions from '../state/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items$!: Observable<Product[]>;
  total$!: Observable<number>;

  constructor(private store: Store<{ cart: CartState }>, private router: Router) {}

  ngOnInit(): void {
    // Select cart items
    this.items$ = this.store.select(state => state.cart.items);

    // Compute total
    this.total$ = this.store.select(
      createSelector(
        (state: { cart: CartState }) => state.cart.items,
        items => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      )
    );
  }

  incrementQuantity(id: number): void {
    this.store.dispatch(CartActions.updateQtyOptimistic({ id, delta: 1 }));
  }

  decrementQuantity(id: number): void {
    this.store.dispatch(CartActions.updateQtyOptimistic({ id, delta: -1 }));
  }

  removeItem(id: number): void {
    this.store.dispatch(CartActions.removeItemOptimistic({ id }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  proceedToProducts(): void {
    this.router.navigate(['/products']);
  }
}