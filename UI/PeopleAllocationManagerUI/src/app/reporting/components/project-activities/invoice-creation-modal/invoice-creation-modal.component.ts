import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectActivitiesModel } from 'src/app/shared/models/ProjectActivitiesReportModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-invoice-creation-modal',
  templateUrl: './invoice-creation-modal.component.html',
  styleUrls: ['./invoice-creation-modal.component.scss']
})
export class InvoiceCreationModalComponent implements OnInit {
  selectedProjectId: any;
  projects = new Array();
  project = new Object() as any;
  selectedProjectIndex: any;

  userId: string;
  employees = new Array();

  startDate: any;
  endDate: any;
  startAt: any;
  endAt: any;

  dailyActivities: any;

  totalWorkedHours = 0;
  totalPrice = 0;

  tableObject: ProjectActivitiesModel;

  tableData = new Array<ProjectActivitiesModel>();

  sd: any;
  ed: any;

  providers: any;
  provider: any;

  dataSource = new MatTableDataSource(this.tableData);
  // columnsToDisplay: string[] = ['projectName', 'serviceName', 'date', 'workedHours', 'price'];
  columnsToDisplay: string[] = ['serviceName', 'date', 'workedHours', 'price'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<InvoiceCreationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
  ) {
    if (data) {
      this.tableData = data.tableData;
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalPrice = data.totalPrice;
      this.totalWorkedHours = data.totalWorkedHours;
      this.sd = data.sd;
      this.ed = data.ed;
      this.provider = data.providers[0];
      this.project = JSON.parse(JSON.stringify(data.project));
    }
  }

  ngOnInit(): void {
  }

  public generateInvoice() {
    this.print();
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  print() {
    const options = {
      filename: 'invoice.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'portrait' }
    };
    const content = document.getElementById('print');
    html2pdf().from(content).set(options).save();
  }

}
