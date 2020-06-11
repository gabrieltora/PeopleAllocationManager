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
  isAdmin: boolean;
  employeeUserRoleId: string;
  employeeSubscription: Subscription;

  @Output()
  sidenavClose = new EventEmitter();

  constructor(private employeeService: EmployeeService) {
    // this.employeeUserRoleId = '';
    this.employeeSubscription = this.employeeService.getEmployeeData()
      .subscribe(employeeData => {
        this.employeeUserRoleId = employeeData.userRoleId;
        this.isAdmin = (employeeData.userRoleId === 1) ? true : false;
        this.isLoggedIn = employeeData ? true : false;
        console.log(this.employeeUserRoleId);
      });
  }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
