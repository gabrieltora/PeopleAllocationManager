import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  public getCountryById(id: number) {
    const params = new HttpParams();
    params.append('id', id.toString());
    const apiUrl = `${environment.apiUrl}/api/Countries/` + id;
    return this.http.get<any>(apiUrl);
  }

  public getCountries() {
    const apiUrl = `${environment.apiUrl}/api/Countries/`;
    return this.http.get<any>(apiUrl);
  }

}
