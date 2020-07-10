import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';
import { ReportingManagementComponent } from './reporting-management.component';
import { VacancyRateComponent } from './components/vacancy-rate/vacancy-rate.component';
import { AllocationRateComponent } from './components/allocation-rate/allocation-rate.component';
import { RequestsReportComponent } from './components/requests-report/requests-report.component';
import { DealsReportComponent } from './components/deals-report/deals-report.component';


@NgModule({
  declarations: [
    ReportingComponent,
    ReportingManagementComponent,
    VacancyRateComponent,
    AllocationRateComponent,
    RequestsReportComponent,
    DealsReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportingRoutingModule,
    RouterModule.forChild([{ path: '', component: ReportingComponent }])
  ]
})
export class ReportingModule { }
