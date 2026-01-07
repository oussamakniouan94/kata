import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { CartState } from '../../cart/state/cart.reducer';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(private store: Store<{ cart: CartState }>, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const items = await firstValueFrom(this.store.select(state => state.cart.items));

    if (!items || items.length === 0) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}