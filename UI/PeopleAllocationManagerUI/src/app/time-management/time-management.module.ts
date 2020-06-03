import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeManagementComponent } from './time-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TimeManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: TimeManagementComponent }])
  ]
})
export class TimeManagementModule { }
