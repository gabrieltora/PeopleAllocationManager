import { ProjectModel } from './ProjectModel';
import { DealModel } from './DealModel';
import { RequestModel } from './RequestModel';
import { CountryModel } from './CountryModel';

export class ClientModel {
    clientId?: number;
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
    isActiveClient: boolean;
    projects?: Array<ProjectModel>;
    deals?: Array<DealModel>;
    request?: Array<RequestModel>;

    constructor() { }
}
