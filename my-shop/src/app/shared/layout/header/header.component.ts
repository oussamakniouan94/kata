import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../features/cart/cart.service';
import { Product } from 'src/app/entities/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  items: Product[] = [];
  subtotal = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
      this.items = this.cartService.getItems();
      this.updateSubtotal();
    });
  }

  private updateSubtotal(): void {
    this.subtotal = this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
