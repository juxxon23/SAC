import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './guard/home.guard';
import { MyprofileGuard } from './guard/myprofile.guard';
import { TexteditorGuard } from './guard/texteditor.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), canActivate: [HomeGuard] },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'signin', loadChildren: () => import('./components/signin/signin.module').then(m => m.SigninModule) },
  { path: 'myprofile', loadChildren: () => import('./components/myprofile/myprofile.module').then(m => m.MyprofileModule), canActivate: [MyprofileGuard] },
  { path: 'editprofile', loadChildren: () => import('./components/editprofile/editprofile.module').then(m => m.EditprofileModule) },
  { path: 'texteditor', loadChildren: () => import('./components/texteditor/texteditor.module').then(m => m.TexteditorModule), canActivate: [TexteditorGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
