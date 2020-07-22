import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DealModel } from 'src/app/shared/models/DealModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DealsService } from 'src/app/shared/services/deals.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { ClientModel } from 'src/app/shared/models/ClientModel';

@Component({
  selector: 'app-deal-modal',
  templateUrl: './deal-modal.component.html',
  styleUrls: ['./deal-modal.component.scss']
})
export class DealModalComponent implements OnInit {
  dealForm: FormGroup;
  dealFormControls: any;
  project: any;
  hasDealId: boolean;
  dealId: number;
  dealData: any;
  clientId: any;
  deal: DealModel;
  statuses = ['waiting', 'accepted', 'rejected'];
  selectedStatus: string;
  status: string;

  loading = false;
  error = '';

  selectedRequest: any;

  clientRequests = new Array<any>();

  maxDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<DealModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dealsService: DealsService,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    if (data.hasOwnProperty('dealData') && data.dealData.hasOwnProperty('dealId')) {
      this.hasDealId = true;
      this.dealId = data.dealData.dealId;
      this.dealData = data.dealData;
      this.clientId = data.dealData.clientId;
    } else {
      this.hasDealId = false;
      this.clientId = data.clientId;
    }

    this.dealForm = this.formBuilder.group({
      Title: ['', [Validators.required]],
      DealId: [''],
      Description: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      ClientId: [this.clientId, [Validators.required]],
      RequestId: [''],
      Status: ['', [Validators.required]],
      DealUrlLink: ['']
    });
  }

  ngOnInit(): void {
    this.getClientRequests();

    console.log('this.clientRequests', this.clientRequests);
    if (this.hasDealId) {
      this.status = this.data.dealData.status;
      this.selectedStatus = this.data.dealData.status;
      this.selectedRequest = this.data.dealData.requestId;

      this.dealForm.patchValue({
        DealId: this.dealId,
        Title: this.data.dealData.title,
        Description: this.data.dealData.description,
        Date: this.data.dealData.date,
        ClientId: this.data.dealData.clientId,
        RequestId: this.data.dealData.requestId,
        Status: this.status,
        DealUrlLink: this.data.dealData.dealUrlLink
      });
    }

    this.dealFormControls = this.dealForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public getClientRequests() {
    this.clientService.getClientByIdGetClientDto(this.clientId).subscribe((data: ClientModel[]) => {
      for (const elem of data[0].requests) {
        this.clientRequests.push(elem);
        // console.log('this.clientRequests', this.clientRequests);
      }
    });
  }

  public addDeal() {
    if (this.dealForm.invalid) {
      return;
    }

    this.deal = {
      title: this.dealForm.controls.Title.value,
      description: this.dealForm.controls.Description.value,
      date: this.dealForm.controls.Date.value,
      clientId: this.clientId,
      requestId: this.dealForm.controls.RequestId.value,
      status: this.dealForm.controls.Status.value,
      dealUrlLink: this.dealForm.controls.DealUrlLink.value
    };

    this.loading = true;

    this.dealsService.addDeal(this.deal).subscribe(
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

  public updateDeal() {
    this.loading = true;
    if (this.dealForm.invalid) {
      return;
    }

    this.deal = {
      dealId: this.dealId,
      title: this.dealForm.controls.Title.value,
      description: this.dealForm.controls.Description.value,
      date: this.dealForm.controls.Date.value,
      clientId: this.clientId,
      requestId: this.dealForm.controls.RequestId.value,
      status: this.dealForm.controls.Status.value,
      dealUrlLink: this.dealForm.controls.DealUrlLink.value
    };

    this.dealsService.updateDeal(this.deal).subscribe(
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
