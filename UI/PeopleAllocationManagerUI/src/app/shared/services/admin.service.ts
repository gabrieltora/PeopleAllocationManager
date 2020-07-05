import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getDepartments() {
    const apiUrl = `${environment.apiUrl}/api/Departments`;
    return this.http.get<any>(apiUrl);
  }

  public addDepartment(department: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Departments`, department)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateDepartment(department: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/Departments/${department.departmentId}`;
    return this.http.put(apiUrl, department)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteDepartment(departmentId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Departments/${departmentId}`;
    return this.http.delete(apiUrl)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public getFunctions() {
    const apiUrl = `${environment.apiUrl}/api/Functions`;
    return this.http.get<any>(apiUrl);
  }

  public addFunction(jobTitle: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Functions`, jobTitle)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateFunction(jobTitle: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/Functions/${jobTitle.functionId}`;
    return this.http.put(apiUrl, jobTitle)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteFunction(jobTitleId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Functions/${jobTitleId}`;
    return this.http.delete(apiUrl)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }
  public getServices() {
    const apiUrl = `${environment.apiUrl}/api/Services`;
    return this.http.get<any>(apiUrl);
  }

  public addService(service: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Services`, service)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateService(service: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/Services/${service.serviceId}`;
    return this.http.put(apiUrl, service)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteService(serviceId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Services/${serviceId}`;
    return this.http.delete(apiUrl)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public getTechnologies() {
    const apiUrl = `${environment.apiUrl}/api/Technologies`;
    return this.http.get<any>(apiUrl);
  }

  public addTechnology(technology: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Technologies`, technology)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateTechnology(technology: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/Technologies/${technology.technologyId}`;
    return this.http.put(apiUrl, technology)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteTechnology(technologyId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Technologies/${technologyId}`;
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
