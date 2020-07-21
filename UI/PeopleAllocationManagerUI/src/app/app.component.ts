import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from './time-management/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PeopleAllocationManagerUI';
  public innerHeight: any;

  employeeSubscription: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight;
  }


  constructor(
    private employeeService: EmployeeService
  ) {

    // if (localStorage.getItem('NowUser')) {
    //   const nowUser = [];
    //   nowUser.push(JSON.parse(JSON.stringify(localStorage.getItem('NowUser'))));
    //   this.employeeService.sendEmployeeData(nowUser);
    // }

    // this.employeeName = '';
    this.employeeSubscription = this.employeeService.getEmployeeData()
      .subscribe(employeeData => {
        // this.employeeName = employeeData.firstName + ' ' + employeeData.lastName;
        // this.employeeId = sessionStorage.getItem('UserId');

        // console.log('employeeData in app', employeeData);
        // this.employeeService.sendEmployeeData(employeeData);

      });

  }


  ngOnInit() {
    this.innerHeight = window.innerHeight;

    if (localStorage.getItem('NowUser')) {
      // console.log('am local storage in app');

      const nowUser = [];
      nowUser.push(JSON.parse(localStorage.getItem('NowUser')));
      this.employeeService.sendEmployeeData(nowUser[0]);
    } else {
      // console.log('NUUUU am local storage in app');
      this.employeeService.sendEmployeeData(null);
    }
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.employeeSubscription.unsubscribe();
  }



}
