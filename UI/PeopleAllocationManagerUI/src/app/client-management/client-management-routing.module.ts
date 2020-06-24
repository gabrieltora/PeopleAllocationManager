import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { ClientManagementComponent } from './client-management.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientsComponent } from './clients.component';
import { ProjectManagementComponent } from './components/projects/project-management/project-management.component';

const routes: Routes = [
    {
        path: '',
        component: ClientsComponent,
        // canActivate: [AuthGuard],
        children: [
            { path: '', component: ClientManagementComponent },
            {
                path: 'client-details/:id',
                component: ClientDetailsComponent,
                // children: [
                //     {path: 'project-managemenet', component: ProjectManagementComponent}
                // ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientManagementRoutingModule { }
