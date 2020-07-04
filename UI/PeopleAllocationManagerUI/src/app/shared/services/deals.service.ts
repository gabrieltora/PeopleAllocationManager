import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: HttpClient) { }

  public addDeal(deal: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Deals`, deal)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateDeal(deal: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/Deals/${deal.dealId}`;
    return this.http.put(apiUrl, deal)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteDeal(dealId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Deals/${dealId}`;
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
