import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionModel } from 'src/app/shared/models/FunctionModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/shared/services/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FunctionModalComponent } from '../function-modal/function-modal.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-functions-management',
  templateUrl: './functions-management.component.html',
  styleUrls: ['./functions-management.component.scss']
})
export class FunctionsManagementComponent implements OnInit {
  functionId: string;
  functions: FunctionModel[] = [];

  dataSource = new MatTableDataSource(this.functions);
  columnsToDisplay: string[] = ['name', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFunctions();
  }

  public getFunctions() {
    this.adminService.getFunctions().subscribe((data: FunctionModel) => {
      this.functions = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(this.functions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openFunctionModal(jobTitle?) {
    const modalData = jobTitle ? { functionData: jobTitle } : {};

    const dialogRef = this.matDialog.open(FunctionModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.functions = [];
        this.getFunctions();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(jobTitle) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteFunction',
      title: 'Stergere funcție!',
      description: 'Dacă continuați, Functia: ' + jobTitle.name + ' va fi sters!',
      actionButtonText: 'Sterge',
      functionId: jobTitle.functionId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.functions = [];
        this.getFunctions();
      } else if (result === false) {
        alert('Funcția nu a fost stearsa');
      }
    });
  }


}
