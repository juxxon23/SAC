import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceedingsRoutingModule } from './proceedings-routing.module';
import { ProceedingsComponent } from './proceedings.component';


@NgModule({
  declarations: [ProceedingsComponent],
  imports: [
    CommonModule,
    ProceedingsRoutingModule
  ]
})
export class ProceedingsModule { }
