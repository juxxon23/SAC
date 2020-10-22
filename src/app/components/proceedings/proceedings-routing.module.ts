import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProceedingsComponent } from './proceedings.component';

const routes: Routes = [{ path: '', component: ProceedingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProceedingsRoutingModule { }
