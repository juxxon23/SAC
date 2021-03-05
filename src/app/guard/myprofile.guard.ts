import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyprofileGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.auth.isLoggedIn().subscribe(
        login => {
          if (login) {
            resolve(true);
          } else {
            console.log('user is nor logged in');
            this.route.navigate(['/login']);
            resolve(false);
          }
        }
      )
    });;
  }

}
