import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate(): boolean {
    const items = this.cartService.getItems();
    if (items.length === 0) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}