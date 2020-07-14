import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-deals-report',
  templateUrl: './deals-report.component.html',
  styleUrls: ['./deals-report.component.scss']
})
export class DealsReportComponent implements OnInit {
  deals: Array<any>;
  requests = new Array();
  dealsReportData = [
    {
      id: 0,
      month: 'Ianuarie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 1,
      month: 'Februarie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 2,
      month: 'Martie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 3,
      month: 'Aprilie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 4,
      month: 'Mai',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 5,
      month: 'Iunie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 6,
      month: 'Iulie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 7,
      month: 'August',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 8,
      month: 'Septembrie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 9,
      month: 'Octombrie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 10,
      month: 'Noiembrie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
    {
      id: 11,
      month: 'Decembrie',
      dealsNumber: 0,
      rejectedDealsNumber: 0,
      waitingDealsNumber: 0,
      acceptedDealsNumber: 0,
      dealsReport: ' '
    },
  ];

  clients = new Array<any>();
  allDeals = 0;
  allRejected = 0;
  allWaiting = 0;
  allAccepted = 0;
  overallReport = '';
  selectedYear: any;
  years = new Array<any>();

  dataSource = new MatTableDataSource(this.dealsReportData);
  columnsToDisplay: string[] = ['month', 'dealsNumber', 'rejectedDealsNumber', 'waitingDealsNumber', 'acceptedDealsNumber', 'dealsReport'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private clientsService: ClientService
  ) { }

  ngOnInit(): void {
    this.setYears();
    this.getClients(+new Date().getFullYear());
  }

  public changeYear() {
    this.getClients(this.selectedYear);
  }

  public setYears() {
    const currentYear = +new Date().getFullYear();
    const startYear = 2000;

    for (let i = 0; i <= currentYear - startYear; i++) {
      const year = startYear + i;
      this.years.push(year.toString());
    }
    this.years.sort((a, b) => (a > b ? -1 : 1));
  }

  public getClients(year: number) {
    for (const month of this.dealsReportData) {
      month.dealsNumber = 0;
      month.acceptedDealsNumber = 0;
      month.rejectedDealsNumber = 0;
      month.waitingDealsNumber = 0;
      month.dealsReport = '';
    }
    this.dataSource = new MatTableDataSource(this.dealsReportData);
    this.clientsService.getClients().subscribe(data => {
      this.allDeals = 0;
      this.allRejected = 0;
      this.allWaiting = 0;
      this.allAccepted = 0;
      this.overallReport = '';
      for (const client of data) {
        for (const deal of client.deals) {
          if (+new Date(deal.date).getFullYear() === +year) {
            const dealMonth = +new Date(deal.date).getMonth();
            const monthIndex = this.dealsReportData.findIndex(month => month.id === dealMonth);
            this.dealsReportData[monthIndex].dealsNumber++;
            this.allDeals++;

            switch (deal.status) {
              case 'waiting':
                this.dealsReportData[monthIndex].waitingDealsNumber++;
                this.allWaiting++;
                break;

              case 'accepted':
                this.dealsReportData[monthIndex].acceptedDealsNumber++;
                this.allAccepted++;
                break;

              case 'rejected':
                this.dealsReportData[monthIndex].rejectedDealsNumber++;
                this.allRejected++;
                break;

              default:
                break;
            }
          }
        }


        for (const dealReport of this.dealsReportData) {
          if (dealReport.dealsNumber === 0) {
            dealReport.dealsReport = 'Lipsă activitate ofertare';
          } else if (dealReport.acceptedDealsNumber === 0) {
            dealReport.dealsReport = 'Lipsă oferte acceptate';
          } else {
            dealReport.dealsReport =
              ((dealReport.acceptedDealsNumber / (dealReport.dealsNumber - dealReport.waitingDealsNumber)) * 100).toFixed(2) + '%';
          }

          if (this.allDeals === 0) {
            this.overallReport = 'Lipsă activitate ofertare';
          } else if (this.allAccepted === 0) {
            this.overallReport = 'Lipsă oferte acceptate';
          } else {
            this.overallReport =
              ((this.allAccepted / (this.allDeals - this.allWaiting)) * 100).toFixed(2) + '%';
          }

          // if (this.allDeals === 0) {
          //   this.overallReport = '0%';
          // } else if (this.allRequests === 0) {
          //   this.overallReport = '100%';
          // } else {
          //   this.overallReport = (((this.allDeals / this.allRequests) * 100).toFixed(2)).toString() + '%';
          // }
        }
      }

      this.dataSource = new MatTableDataSource(this.dealsReportData);
      this.dataSource.sort = this.sort;
    });
  }

}
