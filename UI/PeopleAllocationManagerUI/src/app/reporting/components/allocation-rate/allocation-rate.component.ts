import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from 'src/app/shared/models/EmployeeModel';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { map } from 'rxjs/operators';

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
  newEmployees = new Array();

  departments = new Array();
  dep: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private projectsService: ProjectsService,
    private adminService: AdminService
  ) {
    const date = new Date();
    this.startAt = new FormControl(new Date(date.getFullYear(), date.getMonth(), 1));
    this.endAt = new FormControl(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getProjects();
  }

  public getDepartments() {
    this.adminService.getDepartments().subscribe(res => {
      this.departments.push(res);
    });
    console.log('this.departments', this.departments);
  }

  // public getDepartmentById(id: number) {

  //   // this.adminService.getDepartmentById(id).subscribe(data => {
  //   //   this.department.push(data);
  //   // });

  //   // console.log('deeeeeeeeeeeeeeeeeeeeeeeee', this.department);

  //   // return this.department[0].name;
  //   this.adminService.Test(id).subscribe(res => {
  //     this.department.push(res);
  //   });
  //   console.log('deppppp ', this.department);
  //   return this.department;
  // }

  public getProjects() {
    this.projectsService.getProjecs().subscribe(data => {
      for (const project of data) {
        this.projects.push(project);
      }
    });
  }

  public changeProject() {
    this.project = new Object();
    this.selectedProjectIndex = this.projects.findIndex(project => project.projectId === this.selectedProjectId);

    if (this.selectedProjectIndex !== -1) {
      this.project = JSON.parse(JSON.stringify(this.projects[this.selectedProjectIndex]));
      console.log('project', this.project);

    }

    this.buildTableData(this.startAt.value, this.endAt.value);
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
    const dailyActivitiesCopy = new Array();
    this.dailyActivities = [];

    for (const dailyActivity of this.project.dailyActivities) {
      dailyActivitiesCopy.push(dailyActivity);
    }

    this.dailyActivities =
      dailyActivitiesCopy.filter(dailyActivity =>
        new Date(this.setDayStart(new Date(dailyActivity.date))).getTime() >= new Date(startDate).getTime());

    this.dailyActivities = this.dailyActivities.filter(dailyActivity =>
      new Date(this.setDayStart(new Date(dailyActivity.date))).getTime() <= new Date(endDate).getTime());

    const newEmployees = new Array();
    // let newEmployee = new Object() as any;

    let workedHours = 0;
    for (const dailyActivity of this.dailyActivities) {
      workedHours = workedHours + dailyActivity.workedHours;

      if (newEmployees.length !== 0) {
        const employeeIndex = newEmployees.findIndex(employee => employee.id === dailyActivity.employeeId);

        if (employeeIndex !== -1) {
          newEmployees[employeeIndex].totalWorkedHours = newEmployees[employeeIndex].totalWorkedHours + dailyActivity.workedHours;
        } else {
          const employeeIdIndex = this.project.employeeProject.findIndex(employee => employee.employeeId === dailyActivity.employeeId);
          if (employeeIdIndex !== -1) {
            const id = this.project.employeeProject[employeeIdIndex].employee.departmentId;
            // const name = this.getDepartmentById(+departmentId);
            // console.log('name ', name);
            // const department = this.getDepartmentById(+departmentId);
            // const deptName = this.department[0].name;
            newEmployees.push({
              id: dailyActivity.employeeId,
              totalWorkedHours: dailyActivity.workedHours,
              functionId: this.project.employeeProject[employeeIdIndex].employee.functionId,
              departmentId: id,
              // departmentName: name,
              name: this.project.employeeProject[employeeIdIndex].employee.firstName + ' ' +
                this.project.employeeProject[employeeIdIndex].employee.lastName,
            });
          }
        }
      } else {
        const employeeIdIndex = this.project.employeeProject.findIndex(employee => employee.employeeId === dailyActivity.employeeId);
        if (employeeIdIndex !== -1) {
          const id = this.project.employeeProject[employeeIdIndex].employee.departmentId;
          // const name = this.getDepartmentById(+departmentId);
          // console.log('name ', name);
          // const department = this.getDepartmentById(+departmentId);
          // const deptName = this.department[0].name;
          newEmployees.push({
            id: dailyActivity.employeeId,
            totalWorkedHours: dailyActivity.workedHours,
            functionId: this.project.employeeProject[employeeIdIndex].employee.functionId,
            departmentId: id,
            // departmentName: name,
            name: this.project.employeeProject[employeeIdIndex].employee.firstName + ' ' +
              this.project.employeeProject[employeeIdIndex].employee.lastName,
          });
        }
      }


    }

    for (const employee of newEmployees) {
      this.newEmployees.push(employee);
    }

    this.ceva();
    console.log('newEmployees', newEmployees);
    console.log(this.dailyActivities);



    this.dataSource = new MatTableDataSource(this.newEmployees);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }


  public ceva() {
    console.log('this departments in ceva de 0', this.departments[0]);
    for (const employee of this.newEmployees) {

      const departmentIndex = this.departments[0].findIndex(department => department.departmentId === employee.departmentId);
      if (departmentIndex !== -1) {
        employee.departmentName = this.departments[0][departmentIndex].name;
      }
      // newEmployees[i] = employee.departmentId[0].name
      // const employeeIdIndex = this.project.employeeProject.findIndex(emp => emp.employeeId === dailyActivity.employeeId);
      // const departmentId = this.project.employeeProject[employeeIdIndex].employee.departmentId;
      // const departments = this.getDepartmentById(employee.departmentId);
      // console.log('departments ', departments);
      // // const departmentIndex = departments.findIndex(department => +department.departmentId === employee.departmentId);
      // console.log('departmentIndex ', departmentIndex);
      // employee.departmentName = departments[departmentIndex];
    }
  }


}
