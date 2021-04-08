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
    this.act.next(true);
  }
  setTempAct(act: string) {
    localStorage.setItem('tempAct', act);
  }
  getTempAct(): string {
    return localStorage.getItem('tempAct');
  }

  getCurrentAct(): string {
    return localStorage.getItem('currentAct')
  }

  deleteCurrentAct(): void {
    localStorage.removeItem('currentAct');
    this.act.next(false);
  }
  deleteTempAct() {
    localStorage.removeItem('tempAct');
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
    localStorage.removeItem('tkse');
    this.deleteCurrentAct();
    this.deleteCurrentUser();
    this.isLogin.next(false);
    this.act.next(false)
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
