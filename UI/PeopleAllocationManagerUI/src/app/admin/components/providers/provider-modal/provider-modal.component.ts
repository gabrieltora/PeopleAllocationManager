import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { CountryModel } from 'src/app/shared/models/CountryModel';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.scss']
})
export class ProviderModalComponent implements OnInit {
  providerForm: FormGroup;
  providerFormControls: any;
  provider: any;
  hasProviderId: boolean;
  providerId: number;
  providerData: any;

  selectedCountryId: any;
  countries: any;

  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<ProviderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private providerService: ProviderService,
    private countryService: CountryService
  ) {
    this.getCountries();


    if (data.hasOwnProperty('providerData') && data.providerData.hasOwnProperty('providerId')) {
      this.hasProviderId = true;
      this.providerId = data.providerData.providerId;
      this.providerData = data.providerData;
    } else {
      this.hasProviderId = false;
    }

    this.providerForm = this.formBuilder.group({
      ProviderId: [''],
      Name: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      CountryId: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      City: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      Address: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      PhoneNumber: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      Email: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      Cif: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      Iban: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      Bank: [{ value: '', disabled: this.hasProviderId ? true : false }, [Validators.required]],
      IsInactive: [false]
    });

  }

  ngOnInit(): void {
    if (this.hasProviderId) {
      this.selectedCountryId = this.data.providerData.countryId;
      this.providerForm.patchValue({
        ProviderId: this.providerId,
        Name: this.data.providerData.name,
        CountryId: this.selectedCountryId,
        City: this.data.providerData.city,
        Address: this.data.providerData.address,
        PhoneNumber: this.data.providerData.phoneNumber,
        Email: this.data.providerData.email,
        Cif: this.data.providerData.cif,
        Iban: this.data.providerData.iban,
        Bank: this.data.providerData.bank,
        IsInactive: this.data.providerData.isInactive
      });
    }

    this.providerFormControls = this.providerForm.controls;
  }

  get f() { return this.providerForm.controls; }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public getCountries() {
    this.countryService.getCountries().subscribe((data: CountryModel) => {
      this.countries = data;
    });
  }

  public addProvider() {
    if (this.providerForm.invalid) {
      return;
    }

    this.provider = {
      name: this.providerForm.controls.Name.value,
      countryId: this.providerForm.controls.CountryId.value,
      city: this.providerForm.controls.City.value,
      address: this.providerForm.controls.Address.value,
      phoneNumber: this.providerForm.controls.PhoneNumber.value,
      email: this.providerForm.controls.Email.value,
      cif: this.providerForm.controls.Cif.value,
      iban: this.providerForm.controls.Iban.value,
      bank: this.providerForm.controls.Bank.value,
      isInactive: this.providerForm.controls.IsInactive.value
    };

    this.loading = true;

    this.providerService.addProvider(this.provider).subscribe(
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

  public updateProvider() {
    this.loading = true;
    if (this.providerForm.invalid) {
      return;
    }

    this.provider = {
      providerId: this.providerId,
      name: this.providerForm.controls.Name.value,
      countryId: this.providerForm.controls.CountryId.value,
      city: this.providerForm.controls.City.value,
      address: this.providerForm.controls.Address.value,
      phoneNumber: this.providerForm.controls.PhoneNumber.value,
      email: this.providerForm.controls.Email.value,
      cif: this.providerForm.controls.Cif.value,
      iban: this.providerForm.controls.Iban.value,
      bank: this.providerForm.controls.Bank.value,
      isInactive: this.providerForm.controls.IsInactive.value
    };

    this.providerService.updateProvider(this.provider).subscribe(
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
