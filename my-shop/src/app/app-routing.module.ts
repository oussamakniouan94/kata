import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutGuard } from './features/checkout/checkout.guard';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/plp/plp.module').then(m => m.PlpModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then(m => m.CartModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [CheckoutGuard],
  },
  {

    path: 'order-confirmation',
    loadChildren: () =>
      import('./features/order-confirmation/order-confirmation.module').then(m => m.OrderConfirmationModule),
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }