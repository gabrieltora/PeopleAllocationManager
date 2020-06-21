import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/time-management/services/employee.service';
import { CountryService } from 'src/app/shared/services/country.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidenav: MatSidenav;
  employeeName: string;
  employeeSubscription: Subscription;

  selectSubscription: Subscription;
  selectData: any;


  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(private employeeService: EmployeeService, private countryService: CountryService) {
    this.employeeName = '';
    this.employeeSubscription = this.employeeService.getEmployeeData()
      .subscribe(employeeData => {
        this.employeeName = employeeData.firstName + ' ' + employeeData.lastName;
      });
    // Pass data via Subject and service
    this.selectSubscription = this.employeeService.getSelectData()
      .subscribe(selectData => {
        this.selectData = selectData.name;
        console.log('this.selectData', this.selectData);
        this.getData(selectData.countryId);
      });
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public getData(userId: number) {
    this.countryService.getCountryById(userId).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.employeeSubscription.unsubscribe();
  }

}
