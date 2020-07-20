import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FunctionModel } from 'src/app/shared/models/FunctionModel';

@Component({
  selector: 'app-function-modal',
  templateUrl: './function-modal.component.html',
  styleUrls: ['./function-modal.component.scss']
})
export class FunctionModalComponent implements OnInit {
  functionForm: FormGroup;
  functionFormControls: any;
  hasFunctionId: boolean;
  functionId: number;
  functionData: any;
  jobTitle: FunctionModel;

  loading = false;
  error = '';


  constructor(
    public dialogRef: MatDialogRef<FunctionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    if (data.hasOwnProperty('functionData')) {
      this.hasFunctionId = true;
      this.functionId = data.functionData.functionId;
      this.functionData = data.functionData;
    } else {
      this.hasFunctionId = false;
    }

    this.functionForm = this.formBuilder.group({
      FunctionId: [''],
      Name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.hasFunctionId) {
      this.functionForm.patchValue({
        FunctionId: this.functionId,
        Name: this.data.functionData.name,
      });
    }

    this.functionFormControls = this.functionForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public addFunction() {
    if (this.functionForm.invalid) {
      return;
    }

    this.jobTitle = {
      name: this.functionForm.controls.Name.value
    };

    this.loading = true;

    this.adminService.addFunction(this.jobTitle).subscribe(
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

  public updateFunction() {
    this.loading = true;
    if (this.functionForm.invalid) {
      return;
    }

    this.jobTitle = {
      functionId: this.functionId,
      name: this.functionForm.controls.Name.value
    };

    this.adminService.updateFunction(this.jobTitle).subscribe(
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
