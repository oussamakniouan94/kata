import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { ToastrModule } from 'ngx-toastr';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cartReducer } from './features/cart/state/cart.reducer';
import { storageMetaReducer } from './features/cart/state/storage.metareducer';
import { CartEffects } from './features/cart/state/cart.effects';

@NgModule({
  declarations: [AppComponent],
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

    StoreModule.forRoot({ cart: cartReducer }, { metaReducers: [storageMetaReducer] }),
    EffectsModule.forRoot([CartEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
