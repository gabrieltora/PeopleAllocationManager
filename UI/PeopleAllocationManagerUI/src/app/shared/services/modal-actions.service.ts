import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DailyActivityService } from 'src/app/time-management/services/daily-activity.service';
import { DailyActivityModel } from '../models/DailyActivityModel';
import { EmployeeModel } from '../models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private dailyActivityService: DailyActivityService
  ) { }

  // This function is the only way this service is directly called in the modal.
  // The modal passes to it the received `data` object and then this function\
  // calls the appropriate function based on the name of the modal. Then, that\
  // function receives whatever values it needs that were included in `data`
  modalAction(modalData: any) {
    switch (modalData.name) {
      case 'logout':
        this.logout(modalData);
        break;

      case 'deleteDailyActivity':
        this.deleteDailyActivity(modalData);
        break;

      default:
        break;
    }
  }

  // While the following functions don't make sense in this demo, I've created\
  // them for the sake of mentioning scenearios where the values from data\
  // couldn't be passed directly to the other service calls

  private logout(modalData: EmployeeModel) {
    // Call an authentication service method to logout the user
    this.authService.logout(modalData);
  }

  private deleteDailyActivity(modalData: DailyActivityModel) {
    this.dailyActivityService.deleteDailyActivity(modalData.dailyActivityId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Daily activity deleted');
          return true;
        } else {
          console.log('Daily activity was NOT deteled');
          return false;
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        return false;
      });

  }
}
