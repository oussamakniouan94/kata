import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { ToastrModule } from 'ngx-toastr';

import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cartReducer } from './features/cart/state/cart.reducer';
import { CartEffects } from './features/cart/state/cart.effects';
import { OrderEffects } from './features/checkout/state/order.effects';
import { ProductsEffects } from './features/plp/state/products.effects';
import { storageMetaReducer } from './features/cart/state/storage.metareducer';

@NgModule({
  declarations: [AppComponent],
  providers: [
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true,
    }),

    StoreModule.forRoot({ cart: cartReducer }),
    EffectsModule.forRoot([CartEffects, OrderEffects, ProductsEffects]),
    StoreModule.forRoot({}, { metaReducers: [] })
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

function storageMetaReducerFactory(platformId: Object) {
  throw new Error('Function not implemented.');
}
