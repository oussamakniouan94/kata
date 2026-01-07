import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product.model';
import { CartState } from '../../cart/state/cart.reducer';
import * as OrderActions from './../state/order.actions';
import { selectOrderLoading, selectOrderSuccess, selectOrderError, selectOrderId } from './../state/order.selectors';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items$!: Observable<Product[]>;
  total$!: Observable<number>;
  total: number = 0;
  loading$!: Observable<boolean>;
  success$!: Observable<boolean>;
  error$!: Observable<any>;
  orderId$!: Observable<string | null>;

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

    this.total$.subscribe(total => this.total = total);

    this.loading$ = this.store.select(selectOrderLoading);
    this.success$ = this.store.select(selectOrderSuccess);
    this.error$ = this.store.select(selectOrderError);
    this.orderId$ = this.store.select(selectOrderId);
  }

  placeOrder(items: Product[]): void {
    this.store.dispatch(OrderActions.placeOrder({ items, total: this.total }));
    this.toastr.success('Your order has been placed successfully!', 'Order Confirmed');
    this.router.navigate(['/order-confirmation']);
  }
}
