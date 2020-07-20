import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartmentModel } from 'src/app/shared/models/DepartmentModel';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DepartmentModalComponent } from '../department-modal/department-modal.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-departments-management',
  templateUrl: './departments-management.component.html',
  styleUrls: ['./departments-management.component.scss']
})
export class DepartmentsManagementComponent implements OnInit {
  departmentId: string;
  departments: DepartmentModel[] = [];

  dataSource = new MatTableDataSource(this.departments);
  columnsToDisplay: string[] = ['name', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  public getDepartments() {
    this.adminService.getDepartments().subscribe((data: DepartmentModel) => {
      this.departments = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(this.departments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openDepartmentModal(department?) {
    const modalData = department ?
      {
        departmentData: department
      } :
      {};

    const dialogRef = this.matDialog.open(DepartmentModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departments = [];
        this.getDepartments();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(department) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteDepartment',
      title: 'Stergere departament!',
      description: 'Dacă continuați, Departamentul: ' + department.name + ' va fi sters!',
      actionButtonText: 'Sterge',
      departmentId: department.departmentId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departments = [];
        this.getDepartments();
      } else if (result === false) {
        alert('Departamentul nu a fost sters');
      }
    });
  }

}
