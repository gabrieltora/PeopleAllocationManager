import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminManagementComponent } from './admin-management.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminManagementComponent,
    UsersComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AdminComponent }])
  ]
})
export class AdminModule { }
