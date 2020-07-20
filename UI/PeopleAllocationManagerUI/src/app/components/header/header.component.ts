import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/time-management/services/employee.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidenav: MatSidenav;
  employeeName: string;
  employeeSubscription: Subscription;

  employeeId: any;

  selectSubscription: Subscription;
  selectData: any;

  employee = new Array<any>();


  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private adminService: AdminService,
    public matDialog: MatDialog
  ) {
    this.employeeId = sessionStorage.getItem('UserId');
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

  public openAccountModal(employee?) {
    this.adminService.getEmployeeByIdNoTechnologyNoProjectDto(this.employeeId).subscribe(data => {
      for (const elem of data) {
        this.employee.push(elem);
      }

      const dialogRef = this.matDialog.open(ChangePasswordModalComponent, {
        width: '500px',
        data: {
          employeeData: this.employee
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('reee', result);

          this.employeeService.sendEmployeeData(result);

        } else if (result === false) {
          alert(result);
        }
      });
    });




  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.employeeSubscription.unsubscribe();
  }

}
