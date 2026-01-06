import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlpComponent } from './plp.component';

@NgModule({
  declarations: [PlpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlpComponent }]),
  ],
})
export class PlpModule {}
