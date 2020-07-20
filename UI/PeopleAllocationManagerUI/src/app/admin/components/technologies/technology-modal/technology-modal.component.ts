import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TechnologyModel } from 'src/app/shared/models/TechnologyModel';

@Component({
  selector: 'app-technology-modal',
  templateUrl: './technology-modal.component.html',
  styleUrls: ['./technology-modal.component.scss']
})
export class TechnologyModalComponent implements OnInit {
  technologyForm: FormGroup;
  technologyFormControls: any;
  hasTechnologyId: boolean;
  technologyId: number;
  technologyData: any;
  technology: TechnologyModel;

  loading = false;
  error = '';


  constructor(
    public dialogRef: MatDialogRef<TechnologyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    if (data.hasOwnProperty('technologyData')) {
      this.hasTechnologyId = true;
      this.technologyId = data.technologyData.technologyId;
      this.technologyData = data.technologyData;
    } else {
      this.hasTechnologyId = false;
    }

    this.technologyForm = this.formBuilder.group({
      TechnologyId: [''],
      Name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.hasTechnologyId) {
      this.technologyForm.patchValue({
        TechnologyId: this.technologyId,
        Name: this.data.technologyData.name,
      });
    }

    this.technologyFormControls = this.technologyForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public addTechnology() {
    if (this.technologyForm.invalid) {
      return;
    }

    this.technology = {
      name: this.technologyForm.controls.Name.value
    };

    this.loading = true;

    this.adminService.addTechnology(this.technology).subscribe(
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

  public updateTechnology() {
    this.loading = true;
    if (this.technologyForm.invalid) {
      return;
    }

    this.technology = {
      technologyId: this.technologyId,
      name: this.technologyForm.controls.Name.value
    };

    this.adminService.updateTechnology(this.technology).subscribe(
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
