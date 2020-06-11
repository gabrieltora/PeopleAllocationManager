import { Injectable } from '@angular/core';
import { DailyActivityModel } from 'src/app/shared/models/DailyActivityModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, mapTo, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DailyActivityService {

  constructor(private http: HttpClient) { }

  public addDailyActivity(dailyActivity: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/DailyActivities`, dailyActivity)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateDailyActivity(dailyActivity: DailyActivityModel): Observable<boolean> {
    const params = new HttpParams();
    params.append('id', dailyActivity.dailyActivityId.toString());
    const apiUrl = `${environment.apiUrl}/api/DailyActivities/${dailyActivity.dailyActivityId}`;
    return this.http.put(apiUrl, dailyActivity)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteDailyActivity(dailyActivityId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/DailyActivities/${dailyActivityId}`;
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
