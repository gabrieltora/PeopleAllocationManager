import { EmployeeModel } from './EmployeeModel';

export class DailyActivityModel extends EmployeeModel {
    dailyActivityId: number;
    date: Date;
    workedHours: number;
    comment: string;
    price: number;
    projectId: number;
    projectName?: string;
    employeeId: number;
    serviceId: number;
}
