import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product.model';
import * as ProductsActions from '../state/products.actions';
import { ProductsState } from '../state/products.reducer';
import * as CartActions from '../../cart/state/cart.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plp',
  templateUrl: './plp.component.html',
  styleUrls: ['./plp.component.scss']
})
export class PlpComponent implements OnInit {
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store<{ products: ProductsState }>, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.products$ = this.store.select(state => state.products.products);
    this.loading$ = this.store.select(state => state.products.loading);
    this.error$ = this.store.select(state => state.products.error);

    this.store.dispatch(ProductsActions.loadProducts());
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addItemOptimistic({ product }));
    this.toastr.success('Your order has been placed successfully!', 'Order Confirmed');
  }
}