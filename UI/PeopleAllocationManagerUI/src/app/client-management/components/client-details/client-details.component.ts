import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/shared/services/country.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { CountryModel } from 'src/app/shared/models/CountryModel';
import { ActivatedRoute } from '@angular/router';
import { ClientModel } from 'src/app/shared/models/ClientModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  clientFormControls: any;
  client: ClientModel;
  clientId: any;
  // clientForm: FormGroup;

  selectedCountryId: any;
  countries: any;

  loading = false;
  error = '';

  clientForm: FormGroup = this.formBuilder.group({
    ClientId: [''],
    ClientName: ['', [Validators.required]],
    CountryId: ['', [Validators.required]],
    Phone: ['', [Validators.required]],
    Email: ['', [Validators.required]],
    IsActiveClient: [false],
    Adress: [''],
    City: [''],
    Cif: [''],
    Bank: [''],
    Iban: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.getCountries();
    this.getClientData();
  }

  ngOnInit(): void {
    this.client = {
      clientId: +'',
      name: '',
      countryId: +'',
      phoneNumber: '',
      email: '',
      isActiveClient: null,
      adress: '',
      city: '',
      cif: '',
      bank: '',
      iban: ''
    };

    this.clientFormControls = this.clientForm.controls;
  }

  public getCountries() {
    this.countryService.getCountries().subscribe((data: CountryModel) => {
      this.countries = data;
    });
  }

  get f() { return this.clientForm.controls; }


  public getClientData() {
    this.clientService.getClientById(this.clientId).subscribe((data: ClientModel) => {
      this.setClientData(data);
    });
  }

  public setClientData(client: ClientModel) {
    this.clientForm.patchValue({
      ClientId: this.clientId,
      ClientName: client.name,
      CountryId: client.country.countryId,
      Phone: client.phoneNumber,
      Email: client.email,
      IsActiveClient: client.isActiveClient,
      Adress: client.adress,
      City: client.city,
      Cif: client.cif,
      Bank: client.bank,
      Iban: client.iban
    });
  }

  public updateClient() {
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
      isActiveClient: this.clientForm.controls.IsActiveClient.value,
      adress: this.clientForm.controls.Adress.value,
      city: this.clientForm.controls.City.value,
      cif: this.clientForm.controls.Cif.value,
      bank: this.clientForm.controls.Bank.value,
      iban: this.clientForm.controls.Iban.value
    };

    this.clientService.updateClient(this.client).subscribe(
      success => {
        this.loading = false;
        if (success) {
          this.snackBar.open('Date salvate cu succes', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        } else {
          this.snackBar.open(success + ' ' + 'Datele nu au fost salvate', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.snackBar.open(error + ' ' + 'Datele nu au fost salvate', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });
  }

}
