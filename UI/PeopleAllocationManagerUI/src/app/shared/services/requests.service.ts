import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  public addRequest(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Requests`, request)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateRequest(request: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/Requests/${request.requestId}`;
    return this.http.put(apiUrl, request)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteRequest(requestId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Requests/${requestId}`;
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
