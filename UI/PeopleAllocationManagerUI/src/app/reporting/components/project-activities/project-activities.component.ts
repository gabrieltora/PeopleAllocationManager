import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { FormControl } from '@angular/forms';
import { ProjectActivitiesModel } from 'src/app/shared/models/ProjectActivitiesReportModel';

@Component({
  selector: 'app-project-activities',
  templateUrl: './project-activities.component.html',
  styleUrls: ['./project-activities.component.scss']
})
export class ProjectActivitiesComponent implements OnInit {
  selectedProjectId: any;
  projects = new Array();
  project = new Object() as any;
  selectedProjectIndex: any;

  userId: string;
  employees = new Array();

  startDate: any;
  endDate: any;
  startAt: any;
  endAt: any;

  dailyActivities: any;

  totalWorkedHours = 0;
  totalPrice = 0;

  tableObject: ProjectActivitiesModel;

  tableData = new Array<ProjectActivitiesModel>();

  dataSource = new MatTableDataSource(this.tableData);
  columnsToDisplay: string[] = ['projectName', 'employeeName', 'date', 'workedHours', 'price'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private projectsService: ProjectsService
  ) {
    const date = new Date();
    this.startAt = new FormControl(new Date(date.getFullYear(), date.getMonth(), 1));
    this.endAt = new FormControl(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  }

  ngOnInit(): void {
    this.getProjects();
  }

  public getProjects() {
    this.projectsService.getProjecs().subscribe(data => {
      for (const project of data) {
        this.projects.push(project);
      }
      this.projects = this.projects.filter(elem => elem.isChargeable);
    });
  }

  public changeProject() {
    this.project = new Object();
    this.selectedProjectIndex = this.projects.findIndex(project => project.projectId === this.selectedProjectId);

    if (this.selectedProjectIndex !== -1) {
      this.project = JSON.parse(JSON.stringify(this.projects[this.selectedProjectIndex]));
      // console.log('project', this.project);

    }

    this.buildTableData(
      this.startDate ? this.startDate : this.startAt.value,
      this.endDate ? this.endDate : this.endAt.value);
  }

  public onStartDateChange(startDate) {
    this.startDate = startDate;
    this.buildTableData(startDate, this.endDate ? this.endDate : this.endAt.value);
  }

  public onEndDateChange(endDate) {
    this.endDate = endDate;
    this.buildTableData(this.startDate ? this.startDate : this.startAt.value, endDate);
  }


  public setDayStart(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  public buildTableData(startDate: any, endDate: any) {
    // const workingDays = this.calculateWorkingDays(startDate, endDate);
    // const workingHours = workingDays * 8;

    const dailyActivitiesCopy = new Array();
    const newEmployees = new Array();
    this.dailyActivities = [];

    for (const dailyActivity of this.project.dailyActivities) {
      dailyActivitiesCopy.push(dailyActivity);
    }

    this.dailyActivities =
      dailyActivitiesCopy.filter(dailyActivity =>
        new Date(this.setDayStart(new Date(dailyActivity.date))).getTime() >= new Date(startDate).getTime());

    this.dailyActivities = this.dailyActivities.filter(dailyActivity =>
      new Date(this.setDayStart(new Date(dailyActivity.date))).getTime() <= new Date(endDate).getTime());

    for (const dailyActivity of this.dailyActivities) {
      // ['projectName', 'employeeName', 'date', 'workedHours', 'price']
      dailyActivity.projectName = this.project.name;
      const employeeIndex = this.project.employeeProject.findIndex(employee => employee.employeeId === dailyActivity.employeeId);
      if (employeeIndex !== -1) {
        dailyActivity.employeeName = this.project.employeeProject[employeeIndex].employee.lastName + ' ' +
          this.project.employeeProject[employeeIndex].employee.firstName;
      }

      this.totalWorkedHours = this.totalWorkedHours + dailyActivity.workedHours;
      this.totalPrice = this.totalPrice + dailyActivity.price;

      this.tableData.push(dailyActivity);
    }


    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

}
