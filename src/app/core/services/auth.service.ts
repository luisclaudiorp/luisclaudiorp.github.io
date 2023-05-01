import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';
  constructor(private readonly httpClient: HttpClient) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.httpClient
      .post<{ email: string; password: string }>(`${this.url}/sign`, payload)
      .pipe(
        map((data) => {
          return console.log(data);
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
