import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/time-management/services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidenav: MatSidenav;
  employeeName: string;
  employeeSubscription: Subscription;


  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(private employeeService: EmployeeService) {
    this.employeeName = '';
    this.employeeSubscription = this.employeeService.getEmployeeData()
      .subscribe(employeeData => {
        this.employeeName = employeeData.firstName + ' ' + employeeData.lastName;
        console.log(this.employeeName);
      });
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.employeeSubscription.unsubscribe();
  }

}
