import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from 'src/app/shared/models/EmployeeModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userId: string;
  users: EmployeeModel[] = [];

  dataSource = new MatTableDataSource(this.users);
  columnsToDisplay: string[] = ['name', 'email', 'phone', 'department', 'function', 'seniority', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

  public openUserModal(user?) {

  }

  public openAlertModal(data?) {

  }

}
