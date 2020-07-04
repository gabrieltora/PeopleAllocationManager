import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClientModalComponent } from './components/client-modal/client-modal.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientManagementRoutingModule } from './client-management-routing.module';
import { ClientsComponent } from './clients.component';
import { ProjectManagementComponent } from './components/projects/project-management/project-management.component';
import { ProjectModalComponent } from './components/projects/project-modal/project-modal.component';
import { DealsManagementComponent } from './components/deals/deals-management/deals-management.component';
import { InvoicesManagementComponent } from './components/invoices/invoices-management/invoices-management.component';
import { RequestsManagementComponent } from './components/requests/requests-management/requests-management.component';
import { RequestModalComponent } from './components/requests/request-modal/request-modal.component';
import { DealModalComponent } from './components/deals/deal-modal/deal-modal.component';


@NgModule({
  declarations: [
    ClientManagementComponent,
    ClientModalComponent,
    ClientDetailsComponent,
    ClientsComponent,
    ProjectManagementComponent,
    ProjectModalComponent,
    DealsManagementComponent,
    InvoicesManagementComponent,
    RequestsManagementComponent,
    RequestModalComponent,
    DealModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClientManagementRoutingModule
    // RouterModule.forChild([{ path: '', component: ClientManagementComponent }])
  ]
})
export class ClientManagementModule { }
