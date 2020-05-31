import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeManagementComponent } from './time-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TimeManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TimeManagementComponent }])
  ]
})
export class TimeManagementModule { }
