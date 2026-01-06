import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlpComponent } from './component/plp.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productsReducer } from './state/products.reducer';
import { ProductsEffects } from './state/products.effects';

@NgModule({
  declarations: [PlpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlpComponent }]),
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class PlpModule {}