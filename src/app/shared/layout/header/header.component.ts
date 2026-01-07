import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product.model';
import { CartState } from '../../../features/cart/state/cart.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount$!: Observable<number>;
  items$!: Observable<Product[]>;
  subtotal$!: Observable<number>;

  constructor(private store: Store<{ cart: CartState }>) { }

  ngOnInit(): void {
    this.items$ = this.store.select(state => state.cart.items);

    this.cartCount$ = this.store.select(
      createSelector(
        (state: { cart: CartState }) => state.cart.items,
        items => items.reduce((sum, i) => sum + (i.quantity ?? 0), 0)
      )
    );

    this.subtotal$ = this.store.select(
      createSelector(
        (state: { cart: CartState }) => state.cart.items,
        items => items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      )
    );
  }
}