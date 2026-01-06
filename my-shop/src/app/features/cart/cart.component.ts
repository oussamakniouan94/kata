import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/entities/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.items = this.cartService.getItems();
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  incrementQuantity(id: number): void {
    this.cartService.updateQuantity(id, 1);
    this.refreshCart();
  }

  decrementQuantity(id: number): void {
    this.cartService.updateQuantity(id, -1);
    this.refreshCart();
  }

  removeItem(id: number): void {
    this.cartService.remove(id);
    this.refreshCart();
  }

  clearCart(): void {
    this.cartService.clear();
    this.refreshCart();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  proceedToProducts(): void {
    this.router.navigate(['/products']);
  }
}