import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { PlpComponent } from './plp.component';
import { RouterModule } from '@angular/router';
import { cartReducer } from '../cart/state/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { addItemEffect } from '../cart/state/cart.effects';


@NgModule({
  declarations: [PlpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlpComponent }]),
    StoreModule.forRoot({ cart: cartReducer }),
    EffectsModule.forRoot({ addItemEffect }),
  ],
})
export class PlpModule {}

