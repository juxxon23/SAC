import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'signin', loadChildren: () => import('./components/signin/signin.module').then(m => m.SigninModule) },
  { path: 'menu', loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule) },
  { path: 'myprofile', loadChildren: () => import('./components/myprofile/myprofile.module').then(m => m.MyprofileModule)},
  { path: 'proceedings', loadChildren: () => import('./components/proceedings/proceedings.module').then(m => m.ProceedingsModule) },
  { path: 'editprofile', loadChildren: () => import('./components/editprofile/editprofile.module').then(m => m.EditprofileModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
