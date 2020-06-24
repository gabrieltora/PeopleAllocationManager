import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  projectForm: FormGroup;
  projectFormControls: any;
  project: any;
  hasProjectId: boolean;
  projectId: number;
  projectData: any;
  clientId: any;

  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
  ) {
    // this.clientId = this.route.snapshot.paramMap.get('id');


    if (data.hasOwnProperty('projectData') && data.projectData.hasOwnProperty('projectId')) {
      this.hasProjectId = true;
      this.projectId = data.projectData.projectId;
      this.projectData = data.projectData;
      this.clientId = data.projectData.clientId;
      console.log('data', data);
    } else {
      this.hasProjectId = false;
      this.clientId = data.clientId;
      console.log('this.clientId', this.clientId);
    }

    this.projectForm = this.formBuilder.group({
      ProjectId: [''],
      ProjectName: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      ClientId: [this.clientId, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.hasProjectId) {
      this.projectForm.patchValue({
        ProjectId: this.projectId,
        ProjectName: this.data.projectData.name,
        StartDate: this.data.projectData.startDate,
        EndDate: this.data.projectData.endDate,
        ClientId: this.data.projectData.clientId
      });
    }

    this.projectFormControls = this.projectForm.controls;
  }

  get f() { return this.projectForm.controls; }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public addProject() {
    console.log('this.projectForm', this.projectForm);

    if (this.projectForm.invalid) {
      return;
    }

    this.project = {
      name: this.projectForm.controls.ProjectName.value,
      startDate: this.projectForm.controls.StartDate.value,
      endDate: this.projectForm.controls.EndDate.value,
      clientId: this.clientId
    };

    this.loading = true;

    this.projectsService.addProject(this.project).subscribe(
      success => {
        this.loading = false;
        if (success) {
          this.closeDialog(success);
        } else {
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(this.error);
      });
  }

  public updateProject() {
    this.loading = true;
    if (this.projectForm.invalid) {
      return;
    }

    this.project = {
      projectId: this.projectId,
      name: this.projectForm.controls.ProjectName.value,
      startDate: this.projectForm.controls.StartDate.value,
      endDate: this.projectForm.controls.EndDate.value,
      clientId: this.clientId
    };

    this.projectsService.updateProject(this.project).subscribe(
      success => {
        this.loading = false;
        if (success) {
          this.closeDialog(success);
        } else {
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(this.error);
      });
  }


}
