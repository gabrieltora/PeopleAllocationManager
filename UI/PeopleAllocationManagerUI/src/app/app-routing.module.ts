import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { LoginComponent } from './auth/components/login/login.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'client-management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./client-management/client-management.module').then(m => m.ClientManagementModule)
  },
  {
    path: 'reporting',
    canActivate: [AuthGuard],
    loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule)
  },
  {
    path: 'time-management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./time-management/time-management.module').then(m => m.TimeManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
