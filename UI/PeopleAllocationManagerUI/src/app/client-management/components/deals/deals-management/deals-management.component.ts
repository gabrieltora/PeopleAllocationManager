import { Component, OnInit, ViewChild } from '@angular/core';
import { DealModel } from 'src/app/shared/models/DealModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientModel } from 'src/app/shared/models/ClientModel';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DealModalComponent } from '../deal-modal/deal-modal.component';

@Component({
  selector: 'app-deals-management',
  templateUrl: './deals-management.component.html',
  styleUrls: ['./deals-management.component.scss']
})
export class DealsManagementComponent implements OnInit {
  clientId: string;
  deals: DealModel[] = [];

  dataSource = new MatTableDataSource(this.deals);
  columnsToDisplay: string[] = ['date', 'description', 'status', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.getClientDeals();
  }

  public getClientDeals() {
    this.clientService.getClientById(+this.clientId).subscribe((data: any) => {
      for (const deal of data.deals) {
        // if (deal.dealAccepted) {
        //   deal.status = 'Acceptata';
        // } else {
        //   deal.status = 'Neacceptata';
        // }
        this.deals.push(deal);
      }

      this.dataSource = new MatTableDataSource(this.deals);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openDealModal(deal?) {
    const modalData = deal ?
      {
        dealData: deal
      } :
      {
        clientId: this.clientId
      };

    const dialogRef = this.matDialog.open(DealModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deals = [];
        this.getClientDeals();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(deal) {
    console.log('deal', deal);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteDeal',
      title: 'Stergere ofertă!',
      description: 'Dacă continuați Oferta din data: ' + new Date(deal.date) + ' având obiectivul: ' + deal.description + ' si toate datele legate de această cerere vor fi sterse!',
      actionButtonText: 'Sterge',
      dealId: deal.dealId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deals = [];
        this.getClientDeals();
      } else if (result === false) {
        alert('Oferta nu a fost stersă');
      }
    });
  }

}
