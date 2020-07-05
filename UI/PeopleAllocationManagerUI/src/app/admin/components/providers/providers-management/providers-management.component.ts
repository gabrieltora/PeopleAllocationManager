import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProviderModel } from 'src/app/shared/models/ProviderModel';
import { CountryModel } from 'src/app/shared/models/CountryModel';
import { ProviderModalComponent } from '../provider-modal/provider-modal.component';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { MatDialog } from '@angular/material/dialog';
import { CountryService } from 'src/app/shared/services/country.service';

@Component({
  selector: 'app-providers-management',
  templateUrl: './providers-management.component.html',
  styleUrls: ['./providers-management.component.scss']
})
export class ProvidersManagementComponent implements OnInit {
  services: any;
  providers: ProviderModel[];

  dataSource = new MatTableDataSource(this.providers);
  columnsToDisplay: string[] = [
    'providerName', 'providerCountry', 'providerCity', 'providerAdress', 'providerPhone',
    'providerEmail', 'providerCif', 'providerIban', 'providerBank', 'providerStatus', 'actions'];

  selectedCountryId: any;
  countries: any;
  selectedCountry: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private providerService: ProviderService,
    public matDialog: MatDialog,
    private countryService: CountryService
  ) {
    this.getCountries();
    this.getProviders();
  }

  ngOnInit(): void {
  }

  public getCountries() {
    this.countryService.getCountries().subscribe((data: CountryModel) => {
      this.countries = data;
    });
  }

  public getProviders() {
    this.providerService.getProviders().subscribe((data: any) => {
      const providers = data as Array<ProviderModel>;

      this.setProvidersData(providers);
    });
  }

  public setProvidersData(data) {
    this.providers = new Array<ProviderModel>();
    for (const provider of data) {
      if (provider.isInactive) {
        provider.status = 'Inactiv';
      } else {
        provider.status = 'Activ';
      }
      this.providers.push(provider);
    }
    this.dataSource = new MatTableDataSource(this.providers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    return this.providers;
  }

  public openProviderModal(provider?) {
    const modalData = provider ?
      {
        providerData: provider,
      } :
      {
      };

    const dialogRef = this.matDialog.open(ProviderModalComponent, {
      width: '450px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProviders();
      } else if (result === false) {
        alert(result);
      }
    });
  }


}
