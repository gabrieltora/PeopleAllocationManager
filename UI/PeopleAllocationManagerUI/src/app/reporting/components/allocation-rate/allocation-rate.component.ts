import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from 'src/app/shared/models/EmployeeModel';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-allocation-rate',
  templateUrl: './allocation-rate.component.html',
  styleUrls: ['./allocation-rate.component.scss']
})
export class AllocationRateComponent implements OnInit {
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

  dataSource = new MatTableDataSource(this.employees);
  columnsToDisplay: string[] = ['name', 'department', 'function', 'workedHours', 'allocationRate'];

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

  public setDefaultStartDate() {

  }

  public onStartDateChange(startDate) {
    console.log('startDate', startDate);
    console.log('this.startDate', this.startDate);
    this.buildTableData(startDate, this.endDate ? this.endDate : this.endAt);

  }

  public onEndDateChange(endDate) {
    console.log('endDate', endDate);
    console.log('this.endDate', this.endDate);
  }

  public getProjects() {
    this.projectsService.getProjecs().subscribe(data => {
      for (const project of data) {
        this.projects.push(project);
      }
    });
  }

  public changeProject() {
    this.selectedProjectIndex = this.projects.findIndex(project => project.projectId === this.selectedProjectId);

    if (this.selectedProjectIndex !== -1) {
      this.project = JSON.parse(JSON.stringify(this.projects[this.selectedProjectIndex]));
      console.log('fafa', this.setDayStart(new Date(this.project.dailyActivities[0].date)));
      console.log('project', this.project);

    }
  }


  public setDayStart(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  public buildTableData(startDate: any, endDate: any) {
    this.dailyActivities =
      this.project.dailyActivities.filter(dailyActivity =>
        new Date(this.setDayStart(new Date(dailyActivity.date))).getTime() >= new Date(startDate).getTime() ||
        new Date(this.setDayStart(new Date(dailyActivity.date))).getTime() >= new Date(endDate).getTime());

    console.log(this.dailyActivities);


    // for(const dailyActivity of this.projects.dailyActivities) {
    //   this.employees.push(project)
    // }
    // this.clients = new Array<ClientModel>();
    // for (const client of data) {
    //   if (client.isActiveClient) {
    //     client.status = 'Activ';
    //   } else {
    //     client.status = 'Inactiv';
    //   }
    //   this.clients.push(client);
    // }
    // this.dataSource = new MatTableDataSource(this.clients);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    // return this.clients;
  }





}
