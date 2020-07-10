import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportingComponent } from './reporting.component';
import { ReportingManagementComponent } from './reporting-management.component';

const routes: Routes = [
    {
        path: '',
        component: ReportingComponent,
        children: [
            { path: '', component: ReportingManagementComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportingRoutingModule { }
