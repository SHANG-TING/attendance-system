import { Injectable } from '@angular/core';

const tokenKey = '[AUTH] token';
const userKey = '[AUTH] user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storage: Storage) {}

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return this.storage.getItem(tokenKey);
  }

  setToken(token: string): void {
    this.storage.setItem(tokenKey, token);
  }

  removeAll(): void {
    this.removeToken();
  }

  removeToken(): void {
    this.storage.removeItem(tokenKey);
  }
}
