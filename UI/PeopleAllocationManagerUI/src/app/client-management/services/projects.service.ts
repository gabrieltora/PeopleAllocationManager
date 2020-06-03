import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectModel } from 'src/app/shared/models/ProjectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  public getProjectById(id: number) {
    const params = new HttpParams();
    params.append('id', id.toString());
    const apiUrl = `${environment.apiUrl}/api/Projects/` + id;
    return this.http.get<ProjectModel>(apiUrl);
  }

  public getProjecs() {
    const apiUrl = `${environment.apiUrl}/api/Projects`;
    return this.http.get<any>(apiUrl);
  }
}
