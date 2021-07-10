import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  authState = new BehaviorSubject(false);

  authenticate(token: any) {
    this.authState.next(true);
    localStorage.setItem('token', token);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }
}
