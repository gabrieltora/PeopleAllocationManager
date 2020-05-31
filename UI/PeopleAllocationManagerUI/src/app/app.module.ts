import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { ClientManagementModule } from './client-management/client-management.module';
import { ReportingModule } from './reporting/reporting.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { TimeManagementModule } from './time-management/time-management.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    ClientManagementModule,
    ReportingModule,
    SharedModule,
    TimeManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
