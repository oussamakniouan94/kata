import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { FormControl } from '@angular/forms';
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
  filteredRows$!: Observable<Product[][]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  searchControl = new FormControl('');
  columns = 4;

  constructor(private store: Store, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);

    this.store.dispatch(ProductsActions.loadProducts());

    this.filteredRows$ = combineLatest([
      this.products$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([products, term]) => this.chunkProducts(this.filterProducts(products, term || ''), this.columns))
    );
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addItemOptimistic({ product }));
    this.toastr.success('Your product has been added to the cart!');
  }

  filterProducts(products: Product[], term: string): Product[] {
    if (!term) return products;
    const lowerTerm = term.toLowerCase();
    return products.filter(p => p.title.toLowerCase().includes(lowerTerm));
  }

  chunkProducts(products: Product[], size: number): Product[][] {
    const rows: Product[][] = [];
    for (let i = 0; i < products.length; i += size) {
      rows.push(products.slice(i, i + size));
    }
    return rows;
  }
}