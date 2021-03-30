import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TexteditorRoutingModule } from './texteditor-routing.module';
import { TexteditorComponent } from './texteditor.component';
import { ReactiveFormsModule } from '@angular/forms';

import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [TexteditorComponent],
  imports: [
    CommonModule,
    TexteditorRoutingModule,
    EditorModule,
    ReactiveFormsModule
  ]
})
export class TexteditorModule { }
