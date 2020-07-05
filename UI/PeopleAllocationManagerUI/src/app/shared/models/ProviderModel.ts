import { CountryModel } from './CountryModel';

export class ProviderModel {
    providerId?: number;
    name: string;
    phoneNumber?: string;
    email: string;
    cif?: string;
    country?: CountryModel;
    countryId: number;
    city: string;
    address: string;
    iban?: string;
    bank?: string;
    isInactive: boolean;

    constructor() { }
}
