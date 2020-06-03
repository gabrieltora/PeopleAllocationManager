import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, mapTo, tap, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthenticationModel } from 'src/app/shared/models/AuthenticationModel';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AppConfig } from 'src/app/constants';
import { TokenModel } from 'src/app/shared/models/TokenModel';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public IsAdmin: string;
  public CurrentUserEmail: string;
  private currentUserSubject: BehaviorSubject<TokenModel>;
  public currentUser: Observable<TokenModel>;
  public isRefreshingToken: boolean;

  public userId: number;

  constructor(private http: HttpClient) {
    this.isRefreshingToken = false;
    this.currentUserSubject = new BehaviorSubject<TokenModel>(new TokenModel());
    this.currentUser = this.currentUserSubject.asObservable();
    this.setCurrentUser(StorageService.get<string>(AppConfig.AUTH_STORAGE_KEY));
  }

  private setCurrentUser(token: string) {
    if (token) {
      this.currentUserSubject.next(jwt_decode(token) as TokenModel);
    }
    this.currentUser.subscribe(x => {
      this.IsAdmin = x.adminRole;
      this.CurrentUserEmail = x.email;
    });
  }

  public login(email: string, password: string): Observable<boolean> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // };
    // return this.http.post<any>(`${environment.apiUrl}/api/Token`, { email, password }, httpOptions)
    return this.http.post<any>(`${environment.apiUrl}/api/Token`, { email, password })
      .pipe(
        tap(resp => this.doLoginUser(email, resp)),
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        }));
  }

  public logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getJwtToken()
      })
    };

    return this.http.post<any>(
      `${environment.apiUrl}/auth/logout`,
      httpOptions
    ).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      }));
  }

  public isLoggedIn() {
    this.userId = parseInt(sessionStorage.getItem('UserId'), 10);
    return !!this.getJwtToken() && !this.isRefreshingToken;
  }

  public refreshToken() {
    this.isRefreshingToken = true;
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh`,
      { 'token': this.getJwtToken(), 'refreshToken': this.getRefreshToken() })
      .pipe(
        tap((tokens: AuthenticationModel) => {
          this.storeTokens(tokens);
          this.isRefreshingToken = false;
        }),
        catchError(error => {
          this.isRefreshingToken = false;
          console.log(error.error);
          return of(false);
        })
      );
  }

  private doLoginUser(email: string, resp: AuthenticationModel) {
    this.storeTokens(resp);
    this.setCurrentUser(resp.token);
    sessionStorage.setItem('UserId', resp.userId.toString());
    // this.userId = tokens.userId;
    console.log('tokenstokens', this.userId);

  }

  public doLogoutUser() {
    StorageService.clear();
    this.currentUserSubject.next(new TokenModel());
  }

  public getJwtToken() {
    const x = StorageService.get<string>(AppConfig.AUTH_STORAGE_KEY);
    return x;
  }

  private getRefreshToken() {
    const x = StorageService.get<string>(AppConfig.REFRESH_TOKEN_STORAGE_KEY);
    return x;
  }

  private storeTokens(tokens: AuthenticationModel) {
    StorageService.set<string>(AppConfig.AUTH_STORAGE_KEY, tokens.token);
  }

}
