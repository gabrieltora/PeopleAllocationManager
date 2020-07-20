import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientModel } from '../models/ClientModel';
import { Observable, of, throwError } from 'rxjs';
import { mapTo, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  public getClientById(id: number) {
    const params = new HttpParams();
    params.append('id', id.toString());
    const apiUrl = `${environment.apiUrl}/api/Clients/` + id;
    return this.http.get<ClientModel>(apiUrl);
  }


  public getClientByIdGetClientDto(id: number) {
    const params = new HttpParams();
    params.append('id', id.toString());
    const apiUrl = `${environment.apiUrl}/api/Clients/GetClientDto/dto/` + id;
    return this.http.get<ClientModel[]>(apiUrl);
  }

  public getClients() {
    const apiUrl = `${environment.apiUrl}/api/Clients`;
    return this.http.get<any>(apiUrl);
  }


  public getClientsDealsRequestsDto() {
    const apiUrl = `${environment.apiUrl}/api/ClientsDealsRequests/dto`;
    return this.http.get<any>(apiUrl).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }


  public getClientsDto() {
    const apiUrl = `${environment.apiUrl}/api/Clients/dto`;
    return this.http.get<any>(apiUrl).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error.error);
        return throwError(false);
      })
    );
  }

  public addClient(client: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Clients`, client)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public updateClient(client: any): Observable<any> {
    const params = new HttpParams();
    params.append('id', client.clientId.toString());
    const apiUrl = `${environment.apiUrl}/api/Clients/${client.clientId}`;
    return this.http.put(apiUrl, client)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  public deleteClient(clientId): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/Clients/${clientId}`;
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
