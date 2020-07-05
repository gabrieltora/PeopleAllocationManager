import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminManagementComponent } from './admin-management.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './components/users/users-management/users.component';
import { UserModalComponent } from './components/users/user-modal/user-modal.component';
import { DepartmentsManagementComponent } from './components/departments/departments-management/departments-management.component';
import { DepartmentModalComponent } from './components/departments/department-modal/department-modal.component';
import { FunctionsManagementComponent } from './components/functions/functions-management/functions-management.component';
import { FunctionModalComponent } from './components/functions/function-modal/function-modal.component';
import { ServicesManagementComponent } from './components/services/services-management/services-management.component';
import { ServiceModalComponent } from './components/services/service-modal/service-modal.component';
import { TechnologiesManagementComponent } from './components/technologies/technologies-management/technologies-management.component';
import { TechnologyModalComponent } from './components/technologies/technology-modal/technology-modal.component';
import { ProvidersManagementComponent } from './components/providers/providers-management/providers-management.component';
import { ProviderModalComponent } from './components/providers/provider-modal/provider-modal.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminManagementComponent,
    UsersComponent,
    UserModalComponent,
    DepartmentsManagementComponent,
    DepartmentModalComponent,
    FunctionsManagementComponent,
    FunctionModalComponent,
    ServicesManagementComponent,
    ServiceModalComponent,
    TechnologiesManagementComponent,
    TechnologyModalComponent,
    ProvidersManagementComponent,
    ProviderModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AdminComponent }])
  ]
})
export class AdminModule { }
