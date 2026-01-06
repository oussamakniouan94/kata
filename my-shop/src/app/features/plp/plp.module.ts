import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlpComponent } from './plp.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PlpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlpComponent }]),
  ],
})
export class PlpModule {}

