import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TexteditorComponent } from './texteditor.component';

const routes: Routes = [{ path: '', component: TexteditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TexteditorRoutingModule { }
