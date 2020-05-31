import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingComponent } from './reporting.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ReportingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ReportingComponent }])
  ]
})
export class ReportingModule { }
