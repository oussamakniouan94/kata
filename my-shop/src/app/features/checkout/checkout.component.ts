import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/entities/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: Product[] = [];
  total = 0;

  shipping = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    this.toastr.success('Your order has been placed successfully!', 'Order Confirmed');

    this.cartService.clear();
    this.router.navigate(['/order-confirmation']);
  }
}