import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditprofileRoutingModule } from './editprofile-routing.module';
import { EditprofileComponent } from './editprofile.component';


@NgModule({
  declarations: [EditprofileComponent],
  imports: [
    CommonModule,
    EditprofileRoutingModule
  ]
})
export class EditprofileModule { }
