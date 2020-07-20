import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectModel } from 'src/app/shared/models/ProjectModel';
import { Observable, of } from 'rxjs';
import { mapTo, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  // public getProjectById(id: number) {
  //   const params = new HttpParams();
  //   params.append('id', id.toString());
  //   const apiUrl = `${environment.apiUrl}/api/Projects/` + id;
  //   return this.http.get<ProjectModel>(apiUrl);
  // }

  public getProjectById(id: number) {
    const params = new HttpParams();
    params.append('id', id.toString());
    const apiUrl = `${environment.apiUrl}/api/Projects/` + id;
    return this.http.get<ProjectModel>(apiUrl).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  // public getProjecs() {
  //   const apiUrl = `${environment.apiUrl}/api/Projects`;
  //   return this.http.get<any>(apiUrl);
  // }

  public getProjecs() {
    const apiUrl = `${environment.apiUrl}/api/Projects`;
    return this.http.get<any>(apiUrl).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  public getProjecsDto() {
    const apiUrl = `${environment.apiUrl}/api/Projects/dto`;
    return this.http.get<any>(apiUrl).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  public getProjectsWithDailyActivitiesDto() {
    const apiUrl = `${environment.apiUrl}/api/ProjectWithDailyActivitiesDto/dto`;
    return this.http.get<any>(apiUrl).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  public addProject(project: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Projects`, project)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateProject(project: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/Projects/${project.projectId}`;
    return this.http.put(apiUrl, project)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteProject(projectId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Projects/${projectId}`;
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
