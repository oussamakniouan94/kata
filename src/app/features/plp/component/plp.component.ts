import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product.model';
import * as ProductsActions from '../state/products.actions';
import * as CartActions from '../../cart/state/cart.actions';
import { selectAllProducts, selectProductsLoading, selectProductsError } from '../state/products.selectors';
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

  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);

    this.store.dispatch(ProductsActions.loadProducts());
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addItemOptimistic({ product }));
    this.toastr.success('Your product has been added to the cart!');
  }
}