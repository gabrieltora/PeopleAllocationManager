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

  employeeProjects: any;
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
    this.employeeProjects = data.employeeData.employeeProject;
    this.employeeData = data.employeeData;
    this.services = data.services;
  }

  ngOnInit(): void {

    this.dailyActivityForm = this.formBuilder.group({
      // dailyActivityId: number;
      Date: ['', [Validators.required]],
      WorkedHours: ['', [Validators.required]],
      Comment: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      ProjectId: ['', [Validators.required]],
      EmployeeId: ['', [Validators.required]],
      ServiceId: ['', [Validators.required]]
    });

    this.dailyActivityControls = this.dailyActivityForm.controls;
  }

  get f() { return this.dailyActivityForm.controls; }

  public closeDialog(data) {
    this.dialogRef.close(data);
  }

  public addDailyActivity() {
    console.log('dailyActivityForm', this.dailyActivityForm);

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

    console.log('this.dailyActivity', this.dailyActivity);
    this.loading = true;

    this.dailyActivityService.addDailyActivity(this.dailyActivity).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Daily activity added');
          this.closeDialog(success);
        } else {
          // console.log('error');
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
