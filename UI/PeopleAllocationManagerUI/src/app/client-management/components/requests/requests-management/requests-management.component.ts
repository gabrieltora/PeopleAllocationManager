import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestModel } from 'src/app/shared/models/RequestModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { ClientModel } from 'src/app/shared/models/ClientModel';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-requests-management',
  templateUrl: './requests-management.component.html',
  styleUrls: ['./requests-management.component.scss']
})
export class RequestsManagementComponent implements OnInit {
  clientId: string;
  requests: RequestModel[] = [];

  dataSource = new MatTableDataSource(this.requests);
  columnsToDisplay: string[] = ['date', 'description', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.getClientRequests();
  }

  public getClientRequests() {
    this.clientService.getClientById(+this.clientId).subscribe((data: ClientModel) => {
      for (const request of data.requests) {
        this.requests.push(request);
      }
      this.dataSource = new MatTableDataSource(this.requests);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openRequestModal(request?) {
    const modalData = request ?
      {
        requestData: request
      } :
      {
        clientId: this.clientId
      };

    const dialogRef = this.matDialog.open(RequestModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requests = [];
        this.getClientRequests();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(request) {
    console.log('requeeeeeeeeeeeeeeest', request);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteRequest',
      title: 'Stergere cerere!',
      description: 'Dacă continuați Cererea din data: ' + request.date + ' având obiectivul: ' + request.description + ' si toate datele legate de această cerere vor fi sterse!',
      actionButtonText: 'Sterge',
      requestId: request.requestId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requests = [];
        this.getClientRequests();
      } else if (result === false) {
        alert('Cererea nu a fost stersă');
      }
    });
  }

}
