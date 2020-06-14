import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClientModalComponent } from './components/client-modal/client-modal.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientManagementRoutingModule } from './client-management-routing.module';
import { ClientsComponent } from './clients.component';


@NgModule({
  declarations: [ClientManagementComponent, ClientModalComponent, ClientDetailsComponent, ClientsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClientManagementRoutingModule
    // RouterModule.forChild([{ path: '', component: ClientManagementComponent }])
  ]
})
export class ClientManagementModule { }
