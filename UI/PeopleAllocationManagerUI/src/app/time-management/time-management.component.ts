import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EmployeeService } from './services/employee.service';
import { EmployeeModel } from '../shared/models/EmployeeModel';
import { AuthService } from '../auth/services/auth.service';
import { DailyActivityModel } from '../shared/models/DailyActivityModel';
import { ProjectsService } from '../client-management/services/projects.service';
import { ProjectModel } from '../shared/models/ProjectModel';

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TimeManagementComponent implements OnInit {
  userId: number;
  employee: EmployeeModel;
  dataSource: DailyActivityModel[];
  numeColoane = ['Proiect', 'Data', 'Numar ore', 'Nume serviciu'];
  columnsToDisplay = ['projectId', 'date', 'workedHours', 'serviceId'];

  projects: any;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private projectService: ProjectsService
  ) {
    this.projects = [];
    this.userId = this.authService.userId;
    this.getProjects();
    // this.getData(this.userId);
  }

  ngOnInit(): void { }

  public getData(userId: number) {
    this.employeeService.getEmployeeById(userId).subscribe((data: EmployeeModel) => {
      this.employee = data as EmployeeModel;
      this.setDailyActivityData();
    });
  }

  public getProjects() {
    this.projectService.getProjecs().subscribe((data: any) => {
      this.projects = data as ProjectModel;
      this.getData(this.userId);
    });
  }

  public setDailyActivityData() {
    this.dataSource = new Array<DailyActivityModel>();
    for (const activity of this.employee.dailyActivities) {
      const index = this.projects.findIndex(project => project.projectId === activity.projectId);

      if (index !== -1) {
        activity.projectName = this.projects[index].name;
      }
      this.dataSource.push(activity);
    }
    console.log('this.dataSource', this.dataSource);
    return this.dataSource;
  }

}
