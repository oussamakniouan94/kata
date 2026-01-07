import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { reducers } from './state/app.reducer';
import { storageMetaReducer } from './features/cart/state/storage.metareducer';
import { LayoutModule } from './shared/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    LayoutModule,
    ToastrModule.forRoot({ 
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true, 
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/plp/plp.module').then((m) => m.PlpModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./features/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: 'order-confirmation',
        loadChildren: () =>
          import('./features/order-confirmation/order-confirmation.module').then(
            (m) => m.OrderConfirmationModule
          ),
      },
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers: [
        (reducer) => storageMetaReducer(reducer, PLATFORM_ID),
      ],
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
