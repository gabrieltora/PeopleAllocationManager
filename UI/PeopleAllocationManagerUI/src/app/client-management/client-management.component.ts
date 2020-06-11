import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../shared/services/client.service';
import { CountryService } from '../shared/services/country.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ClientModel } from '../shared/models/ClientModel';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClientModalComponent } from './components/client-modal/client-modal.component';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ClientManagementComponent implements OnInit {
  services: any;
  clients: ClientModel[];

  dataSource = new MatTableDataSource(this.clients);
  columnsToDisplay: string[] = ['clientName', 'clientCountry', 'clientPhone', 'clientEmail', 'clientStatus', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    public matDialog: MatDialog,
  ) {
    this.getClients();
  }

  ngOnInit(): void { }

  public getClients() {
    this.clientService.getClients().subscribe((data: any) => {
      const clients = data as Array<ClientModel>;

      this.setClientsData(clients);
    });
  }

  public setClientsData(data) {
    this.clients = new Array<ClientModel>();
    for (const client of data) {
      if (client.isActiveClient) {
        client.status = 'Activ';
      } else {
        client.status = 'Inactiv';
      }
      this.clients.push(client);
    }
    this.dataSource = new MatTableDataSource(this.clients);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    return this.clients;
  }

  public openClientModal(client?) {
    const modalData = client ?
      {
        clientData: client,
      } :
      {
      };

    const dialogRef = this.matDialog.open(ClientModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClients();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(client) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteClient',
      title: 'Stergere client!',
      description: 'Dacă continuați Clientul: ' + client.name + ' si toate datele legate de acesta vor fi sterse!',
      actionButtonText: 'Sterge',
      clientId: client.clientId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClients();
      } else if (result === false) {
        alert('Clientul nu a fost sters');
      }
    });
  }
}
