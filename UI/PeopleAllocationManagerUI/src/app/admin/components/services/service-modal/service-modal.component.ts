import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ServiceModel } from 'src/app/shared/models/ServiceModel';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss']
})
export class ServiceModalComponent implements OnInit {
  serviceForm: FormGroup;
  serviceFormControls: any;
  hasServiceId: boolean;
  serviceId: number;
  serviceData: any;
  service: ServiceModel;

  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<ServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    if (data.hasOwnProperty('serviceData')) {
      this.hasServiceId = true;
      this.serviceId = data.serviceData.serviceId;
      this.serviceData = data.serviceData;
    } else {
      this.hasServiceId = false;
    }

    this.serviceForm = this.formBuilder.group({
      ServiceId: [''],
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.hasServiceId) {
      this.serviceForm.patchValue({
        ServiceId: this.serviceId,
        Name: this.data.serviceData.name,
        Description: this.data.serviceData.description
      });
    }

    this.serviceFormControls = this.serviceForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public addService() {
    if (this.serviceForm.invalid) {
      return;
    }

    this.service = {
      name: this.serviceForm.controls.Name.value,
      description: this.serviceForm.controls.Description.value
    };

    this.loading = true;

    this.adminService.addService(this.service).subscribe(
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

  public updateService() {
    this.loading = true;
    if (this.serviceForm.invalid) {
      return;
    }

    this.service = {
      serviceId: this.serviceId,
      name: this.serviceForm.controls.Name.value,
      description: this.serviceForm.controls.Description.value
    };

    this.adminService.updateService(this.service).subscribe(
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
