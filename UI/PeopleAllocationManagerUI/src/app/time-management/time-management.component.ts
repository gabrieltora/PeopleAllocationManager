import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EmployeeService } from './services/employee.service';
import { EmployeeModel } from '../shared/models/EmployeeModel';
import { AuthService } from '../auth/services/auth.service';
import { DailyActivityModel } from '../shared/models/DailyActivityModel';
import { ProjectsService } from '../client-management/services/projects.service';
import { ProjectModel } from '../shared/models/ProjectModel';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TimeKeepingModalComponent } from './components/time-keeping-modal/time-keeping-modal.component';
import { ServiceService } from '../shared/services/service.service';
import { ServiceModel } from '../shared/models/ServiceModel';
import { ModalComponent } from '../shared/components/modal/modal.component';


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
  dailyActivity = new DailyActivityModel();
  dailyActivities: DailyActivityModel[];
  services: any;
  projects: any;

  dataSource = new MatTableDataSource(this.dailyActivities);
  columnsToDisplay: string[] = ['projectId', 'date', 'workedHours', 'serviceId', 'actions'];
  expandedElement: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private projectService: ProjectsService,
    private serviceService: ServiceService,
    public matDialog: MatDialog,
  ) {
    this.projects = [];
    this.userId = this.authService.userId;
    this.getServices();
    this.getProjects();
  }

  ngOnInit(): void { }

  public getData(userId: number) {
    this.employeeService.getEmployeeById(userId).subscribe((data: EmployeeModel) => {
      this.employee = data as EmployeeModel;
      this.setDailyActivityData();
      this.sendEmployeeData(this.employee);
    });
  }

  public setUserDetails(employee) {
    sessionStorage.setItem('EmployeeName', employee.firstName + ' ' + employee.lastName);
  }

  public sendEmployeeData(employeeData): void {
    // send message to subscribers via observable subject
    this.employeeService.sendEmployeeData(employeeData);
  }

  public getProjects() {
    this.projectService.getProjecs().subscribe((data: any) => {
      this.projects = data as ProjectModel;
      this.getData(this.userId);
    });
  }

  public getServices() {
    this.serviceService.getServices().subscribe((data: ServiceModel) => {
      this.services = data;
    });
  }

  public setDailyActivityData() {
    this.dailyActivities = new Array<DailyActivityModel>();
    for (const activity of this.employee.dailyActivities) {
      const index = this.projects.findIndex(project => project.projectId === activity.projectId);
      const serviceIndex = this.services.findIndex(service => service.serviceId === activity.serviceId);

      if (index !== -1) {
        activity.projectName = this.projects[index].name;
      }

      if (serviceIndex !== -1) {
        activity.serviceName = this.services[serviceIndex].name;
      }

      this.dailyActivities.push(activity);
    }
    this.dataSource = new MatTableDataSource(this.dailyActivities);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    return this.dailyActivities;
  }

  public openAddDailyActivityModal(dailyActivity?) {
    const modalData = dailyActivity ?
      {
        dailyActivityData: dailyActivity,
        employeeData: this.employee,
        services: this.services
      } :
      {
        employeeData: this.employee,
        services: this.services
      };

    const dialogRef = this.matDialog.open(TimeKeepingModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData(this.userId);
      } else if (result === false) {
        alert('Daily activity was NOT updated');
      }
    });
  }

  public openAlertModal(dailyActivity) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    // dialogConfig.height = '300px';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteDailyActivity',
      title: 'Stergere activitate zilnică?',
      description: 'Dacă continuați, activitatea din data: ' + new Date(dailyActivity.date) + ' va fi ștearsă!',
      actionButtonText: 'Sterge',
      dailyActivityId: dailyActivity.dailyActivityId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData(this.userId);
      } else if (result === false) {
        alert('Daily activity was NOT deletet');
      }
    });
  }

}
