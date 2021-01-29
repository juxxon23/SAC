import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class SigninModule { }
