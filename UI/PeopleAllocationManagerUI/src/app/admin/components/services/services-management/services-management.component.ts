import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/shared/services/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceModel } from 'src/app/shared/models/ServiceModel';
import { ServiceModalComponent } from '../service-modal/service-modal.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-services-management',
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.scss']
})
export class ServicesManagementComponent implements OnInit {
  serviceId: string;
  services: ServiceModel[] = [];

  dataSource = new MatTableDataSource(this.services);
  columnsToDisplay: string[] = ['name', 'description', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  public getServices() {
    this.adminService.getServices().subscribe((data: ServiceModel) => {
      this.services = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(this.services);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openServiceModal(service?) {
    const modalData = service ?
      {
        serviceData: service
      } :
      {};

    const dialogRef = this.matDialog.open(ServiceModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.services = [];
        this.getServices();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(service) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteService',
      title: 'Stergere serviciu!',
      description: 'Dacă continuați, Serviciul: ' + service.name + ' va fi sters!',
      actionButtonText: 'Sterge',
      serviceId: service.serviceId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.services = [];
        this.getServices();
      } else if (result === false) {
        alert('Serviciul nu a fost sters');
      }
    });
  }

}
