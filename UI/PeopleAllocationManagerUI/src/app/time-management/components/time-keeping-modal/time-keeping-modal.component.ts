import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailyActivityModel } from 'src/app/shared/models/DailyActivityModel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmployeeModel } from 'src/app/shared/models/EmployeeModel';
import { DailyActivityService } from '../../services/daily-activity.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-time-keeping-modal',
  templateUrl: './time-keeping-modal.component.html',
  styleUrls: ['./time-keeping-modal.component.scss']
})
export class TimeKeepingModalComponent implements OnInit {
  dailyActivityForm: FormGroup;
  dailyActivityControls: any;
  selectedProjectId: any;
  selectedServiceId: any;

  dailyActivity: any;
  hasDailyActivityId: boolean;
  dailyActivityId: number;

  // employeeProjects: any;
  employeeProjects = new Array<any>();
  services: any;
  employeeData: any;
  employeeHourlyPrice: number;

  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<TimeKeepingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dailyActivityService: DailyActivityService
  ) {
    for (const ep of data.employeeData.employeeProject) {
      this.employeeProjects.push(ep);
    }
    this.employeeData = data.employeeData;

    this.services = data.services;

    if (data.hasOwnProperty('dailyActivityData') && data.dailyActivityData.hasOwnProperty('dailyActivityId')) {
      this.hasDailyActivityId = true;
      this.dailyActivityId = data.dailyActivityData.dailyActivityId;
    } else {
      this.hasDailyActivityId = false;
    }

    this.dailyActivityForm = this.formBuilder.group({
      DailyActivityId: [''],
      Date: ['', [Validators.required]],
      WorkedHours: ['', [Validators.required]],
      Comment: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      ProjectId: ['', [Validators.required]],
      EmployeeId: ['', [Validators.required]],
      ServiceId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.hasDailyActivityId) {
      this.selectedProjectId = this.data.dailyActivityData.projectId;
      this.selectedServiceId = this.data.dailyActivityData.serviceId;
      this.dailyActivityForm.patchValue({
        DailyActivityId: this.dailyActivityId,
        Date: this.data.dailyActivityData.date,
        WorkedHours: this.data.dailyActivityData.workedHours,
        Comment: this.data.dailyActivityData.comment,
        Price: this.data.dailyActivityData.price,
        ProjectId: this.selectedProjectId,
        EmployeeId: this.data.dailyActivityData.employeeId,
        ServiceId: this.selectedServiceId
      });
    }

    this.dailyActivityControls = this.dailyActivityForm.controls;
  }

  get f() { return this.dailyActivityForm.controls; }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }


  public addDailyActivity() {
    this.dailyActivityForm.patchValue({
      EmployeeId: this.employeeData.userId,
      Price: this.dailyActivityForm.controls.WorkedHours.value * this.employeeData.hourlyPrice,
      // Date: new Date(this.dailyActivityForm.controls.Date.value).toISOString()
    });
    if (this.dailyActivityForm.invalid) {
      return;
    }

    this.dailyActivity = {
      date: this.dailyActivityForm.controls.Date.value,
      workedHours: this.dailyActivityForm.controls.WorkedHours.value,
      comment: this.dailyActivityForm.controls.Comment.value,
      price: this.dailyActivityForm.controls.Price.value,
      projectId: this.dailyActivityForm.controls.ProjectId.value,
      employeeId: this.dailyActivityForm.controls.EmployeeId.value,
      serviceId: this.dailyActivityForm.controls.ServiceId.value
    };

    this.loading = true;

    this.dailyActivityService.addDailyActivity(this.dailyActivity).subscribe(
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

  public updateDailyActivity() {
    this.loading = true;
    if (this.dailyActivityForm.invalid) {
      return;
    }

    this.dailyActivityForm.patchValue({
      Price: this.dailyActivityForm.controls.WorkedHours.value * this.employeeData.hourlyPrice
    });

    this.dailyActivity = {
      dailyActivityId: this.dailyActivityId,
      date: this.dailyActivityForm.controls.Date.value,
      workedHours: this.dailyActivityForm.controls.WorkedHours.value,
      comment: this.dailyActivityForm.controls.Comment.value,
      price: this.dailyActivityForm.controls.Price.value,
      projectId: this.dailyActivityForm.controls.ProjectId.value,
      employeeId: this.dailyActivityForm.controls.EmployeeId.value,
      serviceId: this.dailyActivityForm.controls.ServiceId.value
    };

    this.dailyActivityService.updateDailyActivity(this.dailyActivity).subscribe(
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
