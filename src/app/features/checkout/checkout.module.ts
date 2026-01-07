import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CheckoutComponent } from './component/checkout.component';
import { orderReducer } from './state/order.reducer';
import { OrderEffects } from './state/order.effects';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CheckoutComponent }]),
    StoreModule.forFeature('order', orderReducer),
    EffectsModule.forFeature([OrderEffects])
  ],
})
export class CheckoutModule {}