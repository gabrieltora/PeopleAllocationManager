import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { ProjectModel } from 'src/app/shared/models/ProjectModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { ClientModel } from 'src/app/shared/models/ClientModel';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProjectManagementComponent implements OnInit {
  clientId: string;
  projects: ProjectModel[] = [];

  dataSource = new MatTableDataSource(this.projects);
  columnsToDisplay: string[] = ['projectName', 'startDate', 'endDate', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private projectsService: ProjectsService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    public matDialog: MatDialog
  ) {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.getClientProjects();
  }

  ngOnInit(): void {
  }


  public getClientProjects() {
    this.clientService.getClientById(+this.clientId).subscribe((data: ClientModel) => {
      for (const project of data.projects) {
        this.projects.push(project);
      }
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    console.log('this.projects', this.projects);

  }

  public openProjectModal(project?) {
    const modalData = project ?
      {
        projectData: project
      } :
      {
        clientId: this.clientId
      };

    const dialogRef = this.matDialog.open(ProjectModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projects = [];
        this.getClientProjects();
      } else if (result === false) {
        alert(result);
      }
    });
  }

  public openAlertModal(project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: 'deleteProject',
      title: 'Stergere proiect!',
      description: 'Dacă continuați Proiectul: ' + project.name + ' si toate datele legate de acesta vor fi sterse!',
      actionButtonText: 'Sterge',
      projectId: project.projectId
    };
    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projects = [];
        this.getClientProjects();
      } else if (result === false) {
        alert('Proiectul nu a fost sters');
      }
    });
  }

}
