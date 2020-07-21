import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalActionsService } from 'src/app/shared/services/modal-actions.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DailyActivityService } from 'src/app/time-management/services/daily-activity.service';
import { EmployeeModel } from '../../models/EmployeeModel';
import { DailyActivityModel } from '../../models/DailyActivityModel';
import { ClientModel } from '../../models/ClientModel';
import { ClientService } from '../../services/client.service';
import { ProjectsService } from '../../services/projects.service';
import { ProjectModel } from '../../models/ProjectModel';
import { RequestsService } from '../../services/requests.service';
import { RequestModel } from '../../models/RequestModel';
import { DealModel } from '../../models/DealModel';
import { DealsService } from '../../services/deals.service';
import { AdminService } from '../../services/admin.service';
import { DepartmentModel } from '../../models/DepartmentModel';
import { FunctionModel } from '../../models/FunctionModel';
import { ServiceModel } from '../../models/ServiceModel';
import { TechnologyModel } from '../../models/TechnologyModel';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private modalService: ModalActionsService,
    private authService: AuthService,
    private dailyActivityService: DailyActivityService,
    private clientService: ClientService,
    private projectsService: ProjectsService,
    private requestsService: RequestsService,
    private dealsService: DealsService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  // When the user clicks the action button, the modal calls the service\
  // responsible for executing the action for this modal (depending on\
  // the name passed to `modalData`). After that, it closes the modal
  public actionFunction() {
    this.modalAction(this.modalData);
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  public closeModal() {
    this.dialogRef.close();
  }

  public modalAction(modalData: any) {
    switch (modalData.name) {
      case 'logout':
        this.logout(modalData);
        break;

      case 'deleteDailyActivity':
        this.deleteDailyActivity(modalData);
        break;

      case 'deleteClient':
        this.deleteClient(modalData);
        break;

      case 'deleteProject':
        this.deleteProject(modalData);
        break;

      case 'deleteRequest':
        this.deleteRequest(modalData);
        break;

      case 'deleteDeal':
        this.deleteDeal(modalData);
        break;

      case 'deleteDepartment':
        this.deleteDepartment(modalData);
        break;

      case 'deleteFunction':
        this.deleteFunction(modalData);
        break;

      case 'deleteService':
        this.deleteService(modalData);
        break;

      case 'deleteTechnology':
        this.deleteTechnology(modalData);
        break;

      case 'deleteUser':
        this.deleteUser(modalData);
        break;

      default:
        break;
    }
  }

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
          this.closeDialog(success);
        } else {
          console.log('Daily activity was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteClient(modalData: ClientModel) {
    this.clientService.deleteClient(modalData.clientId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Client deleted');
          this.closeDialog(success);
        } else {
          console.log('Client was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteProject(modalData: ProjectModel) {
    this.projectsService.deleteProject(modalData.projectId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Project deleted');
          this.closeDialog(success);
        } else {
          console.log('Project was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteRequest(modalData: RequestModel) {
    this.requestsService.deleteRequest(modalData.requestId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Request deleted');
          this.closeDialog(success);
        } else {
          console.log('Request was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteDeal(modalData: DealModel) {
    this.dealsService.deleteDeal(modalData.dealId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Deal deleted');
          this.closeDialog(success);
        } else {
          console.log('Deal was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteDepartment(modalData: DepartmentModel) {
    this.adminService.deleteDepartment(modalData.departmentId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Department deleted');
          this.closeDialog(success);
        } else {
          console.log('Department was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteFunction(modalData: FunctionModel) {
    this.adminService.deleteFunction(modalData.functionId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Function deleted');
          this.closeDialog(success);
        } else {
          console.log('Function was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteService(modalData: ServiceModel) {
    this.adminService.deleteService(modalData.serviceId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Service deleted');
          this.closeDialog(success);
        } else {
          console.log('Service was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  private deleteTechnology(modalData: TechnologyModel) {
    this.adminService.deleteTechnology(modalData.technologyId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('Technology deleted');
          this.closeDialog(success);
        } else {
          console.log('Technology was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  private deleteUser(modalData) {
    this.adminService.deleteEmployee(modalData.userId).subscribe(
      success => {
        this.loading = false;
        if (success) {
          console.log('User deleted');
          this.closeDialog(success);
        } else {
          console.log('User was NOT deteled');
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(error);
      });
  }


}
