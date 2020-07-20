import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DealModel } from 'src/app/shared/models/DealModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DealsService } from 'src/app/shared/services/deals.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    public dialogRef: MatDialogRef<DealModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dealsService: DealsService,
    private route: ActivatedRoute
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
      DealId: [''],
      Description: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      ClientId: [this.clientId, [Validators.required]],
      Status: ['']
    });
  }

  ngOnInit(): void {
    if (this.hasDealId) {
      this.status = this.data.dealData.status;
      this.selectedStatus = this.data.dealData.status;

      this.dealForm.patchValue({
        DealId: this.dealId,
        Description: this.data.dealData.description,
        Date: this.data.dealData.date,
        ClientId: this.data.dealData.clientId,
        Status: this.status
      });
    }

    this.dealFormControls = this.dealForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public addDeal() {
    if (this.dealForm.invalid) {
      return;
    }

    this.deal = {
      description: this.dealForm.controls.Description.value,
      date: this.dealForm.controls.Date.value,
      clientId: this.clientId,
      status: this.dealForm.controls.Status.value
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
      description: this.dealForm.controls.Description.value,
      date: this.dealForm.controls.Date.value,
      clientId: this.clientId,
      status: this.dealForm.controls.Status.value
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
