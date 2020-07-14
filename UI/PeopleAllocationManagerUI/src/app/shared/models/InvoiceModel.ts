export class InvoiceModel {
    invoiceId?: number;
    date: Date;
    vat: number;
    discount: number;
    providerId: number;
    clientId: number;
    projectId: number;
    price: number;

    constructor() { }
}
