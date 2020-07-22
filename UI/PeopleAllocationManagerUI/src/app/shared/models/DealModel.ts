export class DealModel {
    title?: string;
    dealId?: number;
    date: Date;
    clientId: number;
    dealAccepted?: boolean;
    status: string;
    description: string;
    requestId?: string;
    dealUrlLink?: string;

    constructor() { }
}
