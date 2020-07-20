import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DealsService } from 'src/app/shared/services/deals.service';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { DealsRequestsReportModel } from 'src/app/shared/models/DealsRequestsReportModel';
import { DealModel } from 'src/app/shared/models/DealModel';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-requests-report',
  templateUrl: './requests-report.component.html',
  styleUrls: ['./requests-report.component.scss']
})
export class RequestsReportComponent implements OnInit {
  deals: Array<any>;
  requests = new Array();
  dealsRequestsReportData = [
    {
      id: 0,
      month: 'Ianuarie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 1,
      month: 'Februarie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 2,
      month: 'Martie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 3,
      month: 'Aprilie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 4,
      month: 'Mai',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 5,
      month: 'Iunie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 6,
      month: 'Iulie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 7,
      month: 'August',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 8,
      month: 'Septembrie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 9,
      month: 'Octombrie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 10,
      month: 'Noiembrie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
    {
      id: 11,
      month: 'Decembrie',
      requestsNumber: 0,
      dealsNumber: 0,
      dealsRequestsReport: ' '
    },
  ];

  clients = new Array<any>();
  allDeals = 0;
  allRequests = 0;
  overallReport = '';
  selectedYear = +new Date().getFullYear();
  years = new Array<any>();

  dataSource = new MatTableDataSource(this.dealsRequestsReportData);
  columnsToDisplay: string[] = ['month', 'dealsNumber', 'requestsNumber', 'dealsRequestsReport'];


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private clientsService: ClientService
  ) { }

  ngOnInit(): void {
    this.setYears();
    this.getClientsDealsRequestsDto(this.selectedYear);
  }

  public changeYear() {
    this.getClientsDealsRequestsDto(this.selectedYear);
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

  public getClientsDealsRequestsDto(year: number) {
    for (const month of this.dealsRequestsReportData) {
      month.dealsNumber = 0;
      month.requestsNumber = 0;
      month.dealsRequestsReport = '';
    }
    this.dataSource = new MatTableDataSource(this.dealsRequestsReportData);
    this.clientsService.getClientsDealsRequestsDto().subscribe(data => {
      this.allDeals = 0;
      this.allRequests = 0;
      this.overallReport = '';
      for (const client of data) {
        for (const deal of client.deals) {
          if (+new Date(deal.date).getFullYear() === +year) {
            const dealMonth = +new Date(deal.date).getMonth();
            const monthIndex = this.dealsRequestsReportData.findIndex(month => month.id === dealMonth);
            this.dealsRequestsReportData[monthIndex].dealsNumber++;
            this.allDeals++;
          }
        }

        for (const request of client.requests) {
          if (+new Date(request.date).getFullYear() === +year) {
            const requestMonth = +new Date(request.date).getMonth();
            const monthIndex = this.dealsRequestsReportData.findIndex(month => month.id === requestMonth);
            this.dealsRequestsReportData[monthIndex].requestsNumber++;
            this.allRequests++;
          }
        }

        for (const dealsRequests of this.dealsRequestsReportData) {
          if (dealsRequests.dealsNumber === 0) {
            dealsRequests.dealsRequestsReport = 'Lipsa activitate ofertare';
          } else if (dealsRequests.requestsNumber === 0) {
            dealsRequests.dealsRequestsReport = '100.00%';
          } else {
            dealsRequests.dealsRequestsReport = ((dealsRequests.dealsNumber / dealsRequests.requestsNumber) * 100).toFixed(2) + '%';
          }

          if (this.allDeals === 0) {
            this.overallReport = '0%';
          } else if (this.allRequests === 0) {
            this.overallReport = '100%';
          } else {
            this.overallReport = (((this.allDeals / this.allRequests) * 100).toFixed(2)).toString() + '%';
          }
        }
      }

      this.dataSource = new MatTableDataSource(this.dealsRequestsReportData);
      this.dataSource.sort = this.sort;
    });
  }

}
