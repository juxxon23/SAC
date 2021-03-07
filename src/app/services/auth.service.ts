import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogin = new BehaviorSubject<boolean>(this.checkToken());
  user = new BehaviorSubject<boolean>(null);
  act = new BehaviorSubject<boolean>(null);

  private checkToken(): boolean {
    return !!localStorage.getItem('tkse');
  }

  setCurrentAct(act: string): void {
    localStorage.setItem('currentAct', act);
  }

  getCurrentAct(): string {
    return localStorage.getItem('currentAct')
  }

  private deleteCurrentAct(): void {
    localStorage.removeItem('currentAct');
  }

  login(token: string): void {
    localStorage.setItem('tkse', token);
    this.isLogin.next(true);

  }

  setCurrentUser(user: string): void {
    localStorage.setItem('currentUser', user);
  }

  getCurrentUser(): string {
    return localStorage.getItem('currentUser');
  }

  private deleteCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('tks');
    this.deleteCurrentAct();
    this.deleteCurrentUser();
    this.isLogin.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  isUser(): Observable<boolean> {
    return this.user.asObservable();
  }

  isAct(): Observable<boolean> {
    return this.act.asObservable();
  }
}
