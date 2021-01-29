import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditprofileRoutingModule } from './editprofile-routing.module';
import { EditprofileComponent } from './editprofile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditprofileComponent],
  imports: [
    CommonModule,
    EditprofileRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditprofileModule { }
