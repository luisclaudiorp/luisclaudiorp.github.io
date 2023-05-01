import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.httpClient
      .post<{ token: string }>(`${this.url}/sign`, payload)
      .pipe(
        map((res) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', res.token);
          return this.router.navigate(['admin']);
        }),
        catchError((e) => {
          if (e.error.message) return throwError(() => e.error.message);

          return throwError(
            () =>
              'No momento não estamos conseguindo validar estes dados, tente novamente mais tarde'
          );
        })
      );
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }
}
