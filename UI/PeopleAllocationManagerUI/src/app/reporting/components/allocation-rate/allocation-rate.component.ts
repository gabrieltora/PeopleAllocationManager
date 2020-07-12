import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  columnsToDisplay: string[] = ['name', 'department', 'function', 'totalWorkedHours', 'allocationRate'];

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
    const workingDays = this.calculateWorkingDays(startDate, endDate);
    const workingHours = workingDays * 8;

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
            newEmployees.push({
              id: dailyActivity.employeeId,
              totalWorkedHours: dailyActivity.workedHours,
              function: this.project.employeeProject[employeeIdIndex].employee.function.name,
              department: this.project.employeeProject[employeeIdIndex].employee.department.name,
              name: this.project.employeeProject[employeeIdIndex].employee.firstName + ' ' +
                this.project.employeeProject[employeeIdIndex].employee.lastName,
            });
          }
        }
      } else {
        const employeeIdIndex = this.project.employeeProject.findIndex(employee => employee.employeeId === dailyActivity.employeeId);
        if (employeeIdIndex !== -1) {
          newEmployees.push({
            id: dailyActivity.employeeId,
            totalWorkedHours: dailyActivity.workedHours,
            function: this.project.employeeProject[employeeIdIndex].employee.function.name,
            department: this.project.employeeProject[employeeIdIndex].employee.department.name,
            name: this.project.employeeProject[employeeIdIndex].employee.firstName + ' ' +
              this.project.employeeProject[employeeIdIndex].employee.lastName,
          });
        }
      }
    }

    for (const employee of newEmployees) {
      employee.allocationRate = ((employee.totalWorkedHours / workingHours) * 100).toFixed(2);
    }

    // console.log('newEmployees', newEmployees);
    // console.log(this.dailyActivities);

    this.dataSource = new MatTableDataSource(newEmployees);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  public calculateWorkingDays(start, end) {
    const d0 = start;
    const d1 = end;
    /* Two working days and and a weekend(not working day) */
    const holidays = ['2020-07-01', '2020-07-08', '2020-07-11', '2020-07-12'];
    const startDate = new Date(d0);
    const endDate = new Date(d1);

    // Validate input
    if (endDate < startDate) {
      return 0;
    }

    // Calculate days between dates
    const millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    startDate.setHours(0, 0, 0, 1);  // Start just after midnight
    endDate.setHours(23, 59, 59, 999);  // End just before midnight
    const diff = endDate.getTime() - startDate.getTime();  // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);

    // Subtract two weekend days for every week in between
    const weeks = Math.floor(days / 7);
    days -= weeks * 2;

    // Handle special cases
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();

    // Remove weekend not previously removed.
    if (startDay - endDay > 1) {
      days -= 2;
    }
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay === 0 && endDay !== 6) {
      days--;
    }
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay === 6 && startDay !== 0) {
      days--;
    }
    /* Here is the code */
    holidays.forEach(day => {
      if ((new Date(day).getTime() >= new Date(d0).getTime()) && (new Date(day).getTime() <= new Date(d1).getTime())) {
        /* If it is not saturday (6) or sunday (0), substract it */
        if ((new Date(day).getDay() % 6) !== 0) {
          days--;
        }
      }
    });

    // console.log('daaaaaays', days);

    return days;
  }

}
