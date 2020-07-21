import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from 'src/app/shared/models/EmployeeModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from 'src/app/shared/services/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import * as moment from 'moment';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userId: string;
  employees = new Array<EmployeeModel>();

  emailstring = '';

  dataSource = new MatTableDataSource(this.employees);
  columnsToDisplay: string[] = ['firstName', 'email', 'phoneNumber', 'department', 'function', 'seniority', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private adminService: AdminService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getEmployeesGetDto();
  }

  mail() {
    window.location.href = `mailto:xyz@example.com?Subject=Hello&body=${this.employees[0].lastName}`;
  }

  public getEmployeesGetDto() {
    this.adminService.getEmployeesGetDto().subscribe((data: Array<EmployeeModel>) => {
      for (const employee of data) {
        this.employees.push(employee);
      }

      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openEmployeeModal(employee?) {
    const modalData = employee ?
      {
        employeeData: employee
      } :
      {};

    const dialogRef = this.matDialog.open(UserModalComponent, {
      width: '1024px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = [];
        this.getEmployeesGetDto();
      } else if (result === false) {
        alert(result);
      }
    });
  }


  public openAlertModal(data) {
    console.log('data in delete user modal', data);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteUser',
      title: 'Stergere utilizator!',
      description: 'Dacă continuați, utilizatorul: ' + data.firstName + ' ' + data.lastName + ' va fi sters!',
      actionButtonText: 'Sterge',
      userId: data.userId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = [];
        this.getEmployeesGetDto();
      } else if (result === false) {
        alert('Utilizatorul nu a fost sters');
      }
    });
  }

}
