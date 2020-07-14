export class DealModel {
    dealId?: number;
    date: Date;
    clientId: number;
    dealAccepted?: boolean;
    status: string;
    description: string;

    constructor() { }
}
