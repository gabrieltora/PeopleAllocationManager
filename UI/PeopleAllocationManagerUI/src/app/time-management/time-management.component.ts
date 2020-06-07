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
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
  // dataSource: any;
  dataSource = new MatTableDataSource(this.dailyActivities);
  columnsToDisplay: string[] = ['projectId', 'date', 'workedHours', 'serviceId'];

  expandedElement: any;

  projects: any;

  dailyActivityForm: FormGroup;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private projectService: ProjectsService,
    public matDialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.projects = [];
    this.userId = this.authService.userId;
    this.getProjects();
    // this.getData(this.userId);
    // this.dataSource = new MatTableDataSource(this.dailyActivities);
  }

  ngOnInit(): void {
    this.dailyActivityForm = this.formBuilder.group({
      // dailyActivityId: number;
      date: [this.dailyActivity.date, [Validators.required]],
      workedHours: [this.dailyActivity.workedHours, [Validators.required]],
      comment: [this.dailyActivity.comment, [Validators.required]],
      price: [this.dailyActivity.workedHours * 10],
      projectId: [this.dailyActivity.projectId, [Validators.required]],
      employeeId: [this.userId, [Validators.required]],
      serviceId: [this.dailyActivity.serviceId, [Validators.required]]
    });

  }

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
    this.dailyActivities = new Array<DailyActivityModel>();
    for (const activity of this.employee.dailyActivities) {
      const index = this.projects.findIndex(project => project.projectId === activity.projectId);

      if (index !== -1) {
        activity.projectName = this.projects[index].name;
      }
      this.dailyActivities.push(activity);
    }
    this.dataSource = new MatTableDataSource(this.dailyActivities);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dailyActivities;
  }

  public openAddDailyActivityModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      name: 'addDailyActivity',
      title: 'Are you sure you want to delete this product?',
      description: 'If you continue, the product with ID ' + 1 + ' will be deleted.',
      actionButtonText: 'Adaugă',
      // productId: productId
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


}
