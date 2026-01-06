import { Component, OnInit } from '@angular/core';
import { ProductsService } from './product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/entities/product.model';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/state/cart.actions';

@Component({
  selector: 'app-plp',
  templateUrl: './plp.component.html',
  styleUrls: ['./plp.component.scss']
})
export class PlpComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  
  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addItemOptimistic({ product: { ...product, quantity: 1 } }));
    this.toastr.success('Item added to cart successfully!', 'Cart Updated');
  }
}