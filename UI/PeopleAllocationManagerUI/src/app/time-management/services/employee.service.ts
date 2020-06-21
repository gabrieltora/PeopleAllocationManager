import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from 'src/app/shared/models/EmployeeModel';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  token: string;

  employeeSubject = new Subject<any>();
  selectSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth');
  }

  public sendEmployeeData(empoyeeData) {
    this.employeeSubject.next(empoyeeData);
  }

  public getEmployeeData(): Observable<any> {
    return this.employeeSubject.asObservable();
  }

  // <!-- Pass data via Subject and service -->
  public sendSelectData(selectData) {
    this.selectSubject.next(selectData);
  }

  // <!-- Pass data via Subject and service -->
  public getSelectData(): Observable<any> {
    return this.selectSubject.asObservable();
  }

  public getEmployeeById(id: number) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + this.token
    //   })
    // };
    const params = new HttpParams();
    params.append('id', id.toString());
    const apiUrl = `${environment.apiUrl}/api/Employees/` + id;
    return this.http.get<EmployeeModel>(apiUrl);
  }
}

