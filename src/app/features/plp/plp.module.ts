import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlpComponent } from './component/plp.component';
import { productsReducer } from './state/products.reducer';
import { ProductsEffects } from './state/products.effects';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlpComponent }]),
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
    ToastrModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
})
export class PlpModule {}