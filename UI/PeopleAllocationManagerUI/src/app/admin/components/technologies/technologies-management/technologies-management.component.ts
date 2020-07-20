import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TechnologyModel } from 'src/app/shared/models/TechnologyModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TechnologyModalComponent } from '../technology-modal/technology-modal.component';

@Component({
  selector: 'app-technologies-management',
  templateUrl: './technologies-management.component.html',
  styleUrls: ['./technologies-management.component.scss']
})
export class TechnologiesManagementComponent implements OnInit {
  technologyId: string;
  technologies: TechnologyModel[] = [];

  dataSource = new MatTableDataSource(this.technologies);
  columnsToDisplay: string[] = ['name', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTechnologies();
  }

  public getTechnologies() {
    this.adminService.getTechnologies().subscribe((data: TechnologyModel) => {
      this.technologies = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(this.technologies);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openTechnologyModal(technology?) {
    const modalData = technology ?
      {
        technologyData: technology
      } :
      {};

    const dialogRef = this.matDialog.open(TechnologyModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.technologies = [];
        this.getTechnologies();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(technology) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteTechnology',
      title: 'Stergere tehnologie!',
      description: 'Dacă continuați, Tehnologia: ' + technology.name + ' va fi sters!',
      actionButtonText: 'Sterge',
      technologyId: technology.technologyId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.technologies = [];
        this.getTechnologies();
      } else if (result === false) {
        alert('Tehnologia nu a fost sters');
      }
    });
  }

}
