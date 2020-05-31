import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ClientManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ClientManagementComponent }])
  ]
})
export class ClientManagementModule { }
