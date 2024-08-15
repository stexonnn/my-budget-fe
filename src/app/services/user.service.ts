import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorage: Storage | null = null;

  constructor(
    private jwtHelper: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
    }
  }

  private getStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.localStorage;
    }
    return null;
  }

  getToken(): string | null {
    const storage = this.getStorage();
    return storage ? storage.getItem('token') : null;
  }

  setToken(accessToken: string): void {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem('token', accessToken);
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logOut(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem('token');
    }
  }
}