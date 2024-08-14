import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private jwtHelper: JwtHelperService) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(accessToken: string): void {
    localStorage.setItem('token', accessToken);
  }
/*
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }*/

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logOut(): void {
    localStorage.removeItem('token'); // Clear only the token
  }
}