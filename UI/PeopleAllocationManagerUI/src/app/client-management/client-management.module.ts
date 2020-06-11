import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClientModalComponent } from './components/client-modal/client-modal.component';


@NgModule({
  declarations: [ClientManagementComponent, ClientModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ClientManagementComponent }])
  ]
})
export class ClientManagementModule { }
