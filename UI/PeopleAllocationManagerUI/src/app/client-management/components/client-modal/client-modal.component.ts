import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/shared/services/country.service';
import { CountryModel } from 'src/app/shared/models/CountryModel';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {
  clientForm: FormGroup;
  clientFormControls: any;
  client: any;
  hasClientId: boolean;
  clientId: number;
  clientData: any;

  selectedCountryId: any;
  countries: any;

  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<ClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private clientService: ClientService
  ) {
    this.getCountries();


    if (data.hasOwnProperty('clientData') && data.clientData.hasOwnProperty('clientId')) {
      this.hasClientId = true;
      this.clientId = data.clientData.clientId;
      this.clientData = data.clientData;
    } else {
      this.hasClientId = false;
    }

    this.clientForm = this.formBuilder.group({
      ClientId: [''],
      ClientName: ['', [Validators.required]],
      CountryId: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      IsActiveClient: [false]
    });
  }

  ngOnInit(): void {
    if (this.hasClientId) {
      this.selectedCountryId = this.data.clientData.countryId;
      this.clientForm.patchValue({
        ClientId: this.clientId,
        ClientName: this.data.clientData.name,
        CountryId: this.selectedCountryId,
        Phone: this.data.clientData.phoneNumber,
        Email: this.data.clientData.email,
        IsActiveClient: this.data.clientData.isActiveClient
      });
    }

    this.clientFormControls = this.clientForm.controls;
  }

  get f() { return this.clientForm.controls; }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public getCountries() {
    this.countryService.getCountries().subscribe((data: CountryModel) => {
      this.countries = data;
    });
  }

  public addClient() {
    if (this.clientForm.invalid) {
      return;
    }

    this.client = {
      name: this.clientForm.controls.ClientName.value,
      countryId: this.clientForm.controls.CountryId.value,
      phoneNumber: this.clientForm.controls.Phone.value,
      email: this.clientForm.controls.Email.value,
      isActiveClient: this.clientForm.controls.IsActiveClient.value
    };

    this.loading = true;

    this.clientService.addClient(this.client).subscribe(
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
    if (this.clientForm.invalid) {
      return;
    }

    this.client = {
      clientId: this.clientId,
      name: this.clientForm.controls.ClientName.value,
      countryId: this.clientForm.controls.CountryId.value,
      phoneNumber: this.clientForm.controls.Phone.value,
      email: this.clientForm.controls.Email.value,
      isActiveClient: this.clientForm.controls.IsActiveClient.value
    };

    this.clientService.updateClient(this.client).subscribe(
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
