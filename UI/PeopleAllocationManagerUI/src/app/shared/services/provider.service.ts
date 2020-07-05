import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  public getProviders() {
    const apiUrl = `${environment.apiUrl}/api/Providers`;
    return this.http.get<any>(apiUrl);
  }

  public addProvider(provider: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Providers`, provider)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateProvider(provider: any): Observable<any> {
    const params = new HttpParams();
    params.append('id', provider.providerId.toString());
    const apiUrl = `${environment.apiUrl}/api/Providers/${provider.providerId}`;
    return this.http.put(apiUrl, provider)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteProvider(providerId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Providers/${providerId}`;
    return this.http.delete(apiUrl)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }
}
