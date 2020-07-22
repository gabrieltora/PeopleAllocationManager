import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/time-management/services/employee.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin = false;
  isManager = false;
  isSuperAdmin = false;

  employeeUserRoleId: string;
  employeeSubscription: Subscription;

  @Output()
  sidenavClose = new EventEmitter();

  constructor(private employeeService: EmployeeService) {
    this.employeeSubscription = this.employeeService.getEmployeeData()
      .subscribe(employeeData => {

        if (employeeData) {
          this.employeeUserRoleId = employeeData.userRoleId;
          this.isAdmin = employeeData.userRoleId === 1 ? true : false;
          this.isManager = employeeData.userRoleId === 1 ? true : false;
          this.isSuperAdmin = employeeData.userRoleId === 7 ? true : false;

        } else {

        }

        this.isLoggedIn = employeeData ? true : false;
        console.log('employeeData in sidenav', employeeData);
      });
  }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
