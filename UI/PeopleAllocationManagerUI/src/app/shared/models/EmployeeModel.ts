import { DailyActivityModel } from './DailyActivityModel';

export class EmployeeModel {
    userId: number;
    employeeCode: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    createdDate: Date;
    birthDate?: Date;
    phoneNumber?: string;
    grossSalary?: number;
    netSalary?: number;
    hourlyPrice?: number;
    isVatPayer?: boolean;
    departmentId: number;
    userRoleId: number;
    functionId?: number;
    seniorityId?: number;
    dailyActivities: Array<DailyActivityModel>;

    constructor() { }
}
