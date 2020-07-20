import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {
  employeeForm: FormGroup;
  employeeFormControls: any;

  employeeId: number;
  employeeData: any;
  employee = new Object();

  hidePassword = false;


  loading = false;
  error = '';
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    console.log('data', this.data);

    this.employeeForm = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      BirthDate: [''],
      PhoneNumber: ['']
    });
  }

  ngOnInit(): void {
    this.employeeForm.patchValue({
      FirstName: this.data.employeeData[0].firstName,
      LastName: this.data.employeeData[0].lastName,
      Password: this.data.employeeData[0].password,
      BirthDate: this.data.employeeData[0].birthDate,
      PhoneNumber: this.data.employeeData[0].phoneNumber
    });

    this.employeeFormControls = this.employeeForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public updateEmployee() {
    console.log(this.employeeForm);

    this.loading = true;
    if (this.employeeForm.invalid) {
      return;
    }

    this.employee = {
      userId: this.data.employeeData[0].userId,
      firstName: this.employeeForm.controls.FirstName.value,
      lastName: this.employeeForm.controls.LastName.value,
      userName: this.employeeForm.controls.FirstName.value + this.employeeForm.controls.LastName.value,
      employeeCode: this.employeeForm.controls.FirstName.value + this.employeeForm.controls.LastName.value,
      email: this.data.employeeData[0].email,
      createdDate: this.data.employeeData[0].createdDate,
      birthDate: this.employeeForm.controls.BirthDate.value,
      password: this.employeeForm.controls.Password.value,
      phoneNumber: this.employeeForm.controls.PhoneNumber.value,
      departmentId: this.data.employeeData[0].departmentId,
      userRoleId: this.data.employeeData[0].userRoleId
    };

    this.adminService.updateEmployee(this.employee).subscribe(
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
