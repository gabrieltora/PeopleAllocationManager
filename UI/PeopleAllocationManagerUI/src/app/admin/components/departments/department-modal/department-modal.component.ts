import { Component, OnInit, Inject } from '@angular/core';
import { DepartmentModel } from 'src/app/shared/models/DepartmentModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss']
})
export class DepartmentModalComponent implements OnInit {
  departmentForm: FormGroup;
  departmentFormControls: any;
  hasDepartmentId: boolean;
  departmentId: number;
  departmentData: any;
  department: DepartmentModel;

  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<DepartmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    if (data.hasOwnProperty('departmentData')) {
      this.hasDepartmentId = true;
      this.departmentId = data.departmentData.departmentId;
      this.departmentData = data.departmentData;
      console.log('data', data);
    } else {
      this.hasDepartmentId = false;
    }

    this.departmentForm = this.formBuilder.group({
      DepartmentId: [''],
      Name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.hasDepartmentId) {
      this.departmentForm.patchValue({
        DepartmentId: this.departmentId,
        Name: this.data.departmentData.name,
      });
    }

    this.departmentFormControls = this.departmentForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public addDepartment() {
    console.log('this.departmentForm', this.departmentForm);

    if (this.departmentForm.invalid) {
      return;
    }

    this.department = {
      name: this.departmentForm.controls.Name.value
    };

    this.loading = true;

    this.adminService.addDepartment(this.department).subscribe(
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

  public updateDepartment() {
    this.loading = true;
    if (this.departmentForm.invalid) {
      return;
    }

    this.department = {
      departmentId: this.departmentId,
      name: this.departmentForm.controls.Name.value
    };

    this.adminService.updateDepartment(this.department).subscribe(
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
