import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/entities/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadCart();
    }
  }

  getItems(): Product[] {
    return this.items;
  }

  add(item: Product): void {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.saveCart();
    this.updateCartCount();
  }

  clear(): void {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
  }

  remove(itemId: number): void {
    this.items = this.items.filter(i => i.id !== itemId);
    this.saveCart();
    this.updateCartCount();
  }

  updateQuantity(itemId: number, change: number): void {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.remove(itemId);
      } else {
        this.saveCart();
        this.updateCartCount();
      }
    }
  }

  private updateCartCount(): void {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(count);
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadCart(): void {
    const data = localStorage.getItem('cart');
    if (data) {
      this.items = JSON.parse(data);
      this.updateCartCount();
    }
  }
}