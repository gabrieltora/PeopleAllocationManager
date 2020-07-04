import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { RequestModel } from 'src/app/shared/models/RequestModel';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss']
})
export class RequestModalComponent implements OnInit {
  requestForm: FormGroup;
  requestFormControls: any;
  project: any;
  hasRequestId: boolean;
  requestId: number;
  requestData: any;
  clientId: any;
  request: RequestModel;

  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<RequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private requestsService: RequestsService,
    private route: ActivatedRoute
  ) {
    if (data.hasOwnProperty('requestData') && data.requestData.hasOwnProperty('requestId')) {
      this.hasRequestId = true;
      this.requestId = data.requestData.requestId;
      this.requestData = data.requestData;
      this.clientId = data.requestData.clientId;
      console.log('data', data);
    } else {
      this.hasRequestId = false;
      this.clientId = data.clientId;
      console.log('this.clientId', this.clientId);
    }

    this.requestForm = this.formBuilder.group({
      RequestId: [''],
      Description: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      ClientId: [this.clientId, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.hasRequestId) {
      this.requestForm.patchValue({
        RequestId: this.requestId,
        Description: this.data.requestData.description,
        Date: this.data.requestData.date,
        ClientId: this.data.requestData.clientId
      });
    }

    this.requestFormControls = this.requestForm.controls;
  }

  get f() { return this.requestForm.controls; }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public addRequest() {
    console.log('this.requestForm', this.requestForm);

    if (this.requestForm.invalid) {
      return;
    }

    this.request = {
      description: this.requestForm.controls.Description.value,
      date: this.requestForm.controls.Date.value,
      clientId: this.clientId
    };

    this.loading = true;

    this.requestsService.addRequest(this.request).subscribe(
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

  public updateRequest() {
    this.loading = true;
    if (this.requestForm.invalid) {
      return;
    }

    this.request = {
      requestId: this.requestId,
      description: this.requestForm.controls.Description.value,
      date: this.requestForm.controls.Date.value,
      clientId: this.clientId
    };

    this.requestsService.updateRequest(this.request).subscribe(
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
