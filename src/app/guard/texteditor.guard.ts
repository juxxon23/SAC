import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TexteditorGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router 
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.auth.isLoggedIn().subscribe(
        login => {
          if (login) {
            resolve(true);
          } else {
            this.router.navigate(['/login']);
            resolve(false);
          }
        }
      )
    });
  }

}
