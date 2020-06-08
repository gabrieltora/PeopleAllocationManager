import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeManagementComponent } from './time-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TimeKeepingModalComponent } from './components/time-keeping-modal/time-keeping-modal.component';



@NgModule({
  declarations: [TimeManagementComponent, TimeKeepingModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: TimeManagementComponent }])
  ]
})
export class TimeManagementModule { }
