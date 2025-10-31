import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod'; // <-- Import the environment file

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use the backendUrl from the environment file
  private backendUrl = `${environment.backendUrl}/auth`;
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check if we are in a browser
  ) { }

  signupUser(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/signup`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Only use localStorage if running in a browser
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, response.token);
          }
        }
      })
    );
  }

  getToken(): string | null {
    // Only use localStorage if running in a browser
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    // Only use localStorage if running in a browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }
}