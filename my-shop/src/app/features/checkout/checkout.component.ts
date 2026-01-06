import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product.model';
import { CartState } from '../cart/state/cart.reducer';
import * as CartActions from '../cart/state/cart.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items$!: Observable<Product[]>;
  total$!: Observable<number>;

  shipping = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  constructor(
    private store: Store<{ cart: CartState }>,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.items$ = this.store.select(state => state.cart.items);

    this.total$ = this.store.select(
      createSelector(
        (state: { cart: CartState }) => state.cart.items,
        items => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      )
    );
  }

  placeOrder(): void {
    this.toastr.success('Your order has been placed successfully!', 'Order Confirmed');
    this.store.dispatch(CartActions.clearCart());
    this.router.navigate(['/order-confirmation']);
  }
}