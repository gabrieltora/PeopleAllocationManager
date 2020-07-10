import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-reporting-management',
  templateUrl: './reporting-management.component.html',
  styleUrls: ['./reporting-management.component.scss']
})
export class ReportingManagementComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() { }

  ngOnInit(): void {
  }

}
