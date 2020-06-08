import { Injectable } from '@angular/core';
import { DailyActivityModel } from 'src/app/shared/models/DailyActivityModel';
import { HttpClient } from '@angular/common/http';
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
          console.log('aici', error);
          return of(false);
        })
      );
  }
}
