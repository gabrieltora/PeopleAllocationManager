import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  public getServiceById(id: number) {
    const params = new HttpParams();
    params.append('id', id.toString());
    const apiUrl = `${environment.apiUrl}/api/Services/` + id;
    return this.http.get<any>(apiUrl);
  }

  public getServices() {
    const apiUrl = `${environment.apiUrl}/api/Services/`;
    return this.http.get<any>(apiUrl);
  }
}
