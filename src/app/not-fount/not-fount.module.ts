import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFountRoutingModule } from './not-fount-routing.module';
import { NotFountComponent } from './not-fount.component';


@NgModule({
  declarations: [
    NotFountComponent
  ],
  imports: [
    CommonModule,
    NotFountRoutingModule
  ]
})
export class NotFountModule { }
