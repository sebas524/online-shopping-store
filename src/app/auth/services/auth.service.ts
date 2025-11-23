import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  // * why checking? because when the user
  // * refreshses browser we need to check if the user is authenticated or not
  // * this will depend on the token found in the localstorage or w/e is valid or not.
  // * but this is an asynchronous operation so we start with 'checking' state

  private _user = signal<User | null>(null);
  // * we start with null because we don't have any user info at the beginning

  private _token = signal<string | null>(localStorage.getItem('shoppingToken'));
  // * we start with null because we don't have any token at the beginning

  private http = inject(HttpClient);

  // * now lets create a getter so users can subscribe to it
  // * and see in what current state we find ourselves in
  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  user = computed<User | null>(() => {
    return this._user();
  });

  token = computed<string | null>(() => {
    return this._token();
  });

  private baseUrl = environment.baseUrl;

  // * so as soon as the service gets called, this resource gets triggered:
  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((resp) => {
          return this.handleSuccessfulLogin(resp);
        }),

        catchError((error: any) => {
          return this.handleFailedLogin(error);
        })
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('shoppingToken');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<AuthResponse>(`${this.baseUrl}/auth/check-status`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map((resp) => {
          return this.handleSuccessfulLogin(resp);
        }),
        catchError((error: any) => {
          return this.handleFailedLogin(error);
        })
      );
  }

  logout() {
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    this._token.set(null);
    localStorage.removeItem('shoppingToken');
  }

  private handleSuccessfulLogin(resp: AuthResponse) {
    // * if everything goes well and we get a successful response:
    this._user.set(resp.user);
    this._authStatus.set('authenticated');
    this._token.set(resp.token);
    // * the above token needs to be stored somehow because if the user
    // * refreshes the browser we will lose it, so we can store it in
    // * localstorage for simplicity
    localStorage.setItem('shoppingToken', resp.token);

    return true;
  }

  private handleFailedLogin(error: any) {
    this.logout();
    return of(false);
  }
}
