import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmployeeModel } from 'src/app/shared/models/EmployeeModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/admin.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  employeeForm: FormGroup;
  employeeFormControls: any;
  hasEmployeeId: boolean;
  employeeId: number;
  employeeData: any;
  employee = new Object();
  selectedDepartmentId: any;
  selectedUserRoleId: any;
  selectedFunctionId: any;
  selectedSeniorityId: any;
  departments = new Array<any>();
  userRoles = new Array<any>();
  userFunctions = new Array<any>();
  seniorities = new Array<any>();

  loading = false;
  error = '';

  selectedProjects = new Array<any>();
  projects = new Array<object>();
  selectedTechnologies = new Array<any>();
  technologies = new Array<object>();

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private projectsService: ProjectsService
  ) {
    if (data.hasOwnProperty('employeeData')) {
      this.hasEmployeeId = true;
      this.employeeId = data.employeeData.employeeId;
      this.employeeData = data.employeeData;
    } else {
      this.hasEmployeeId = false;
    }

    this.employeeForm = this.formBuilder.group({
      UserId: [''],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      UserName: [''],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      BirthDate: [''],
      PhoneNumber: [''],
      GrossSalary: [''],
      NetSalary: [''],
      HourlyPrice: ['', [Validators.required]],
      IsVatPayer: [''],
      DepartmentId: ['', [Validators.required]],
      UserRoleId: ['', [Validators.required]],
      FunctionId: ['', [Validators.required]],
      SeniorityId: ['', [Validators.required]],

    });

  }

  ngOnInit() {
    this.getDepartments();
    this.getUserFunctions();
    this.getUserRoles();
    this.getUserSeniorities();
    this.getProjectsDto();
    this.getTechnologies();

    if (this.hasEmployeeId) {
      this.selectedDepartmentId = this.data.employeeData.departmentId;
      this.selectedFunctionId = this.data.employeeData.functionId;
      this.selectedSeniorityId = this.data.employeeData.seniorityId;
      this.selectedUserRoleId = this.data.employeeData.userRoleId;
      for (const technology of this.data.employeeData.employeeTechnology) {
        this.selectedTechnologies.push({
          technologyId: technology.technologyId,
          name: technology.name
        });
      }

      this.selectedProjects = JSON.parse(JSON.stringify(this.data.employeeData.employeeProject));

      this.employeeForm.patchValue({
        UserId: this.data.employeeData.userId,
        FirstName: this.data.employeeData.firstName,
        LastName: this.data.employeeData.lastName,
        UserName: this.data.employeeData.userName,
        Email: this.data.employeeData.email,
        Password: this.data.employeeData.password,
        BirthDate: new Date(this.data.employeeData.birthDate),
        PhoneNumber: this.data.employeeData.phoneNumber,
        GrossSalary: this.data.employeeData.grossSalary,
        NetSalary: this.data.employeeData.netSalary,
        HourlyPrice: this.data.employeeData.hourlyPrice,
        IsVatPayer: this.data.employeeData.isVatPayer,
        DepartmentId: this.selectedDepartmentId,
        UserRoleId: this.selectedUserRoleId,
        FunctionId: this.selectedFunctionId,
        SeniorityId: this.selectedSeniorityId,
      });
    }

    this.employeeFormControls = this.employeeForm.controls;
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  public onProjectsChange() {

  }

  public onTechnologiesChange() {
  }


  public getProjectsDto() {
    this.projectsService.getProjecsDto().subscribe(data => {
      for (const project of data) {
        this.projects.push(project);
      }
    });
  }

  public getDepartments() {
    this.adminService.getDepartments().subscribe(data => {
      for (const department of data) {
        this.departments.push(department);
      }
    });
  }

  public getUserRoles() {
    this.adminService.getUserRoles().subscribe(data => {
      for (const userRole of data) {
        this.userRoles.push(userRole);
      }
    });
  }

  public getUserFunctions() {
    this.adminService.getFunctions().subscribe(data => {
      for (const userFunction of data) {
        this.userFunctions.push(userFunction);
      }
    });
  }

  public getTechnologies() {
    this.adminService.getTechnologies().subscribe(data => {
      for (const technology of data) {
        this.technologies.push(technology);
      }
    });
  }

  public getUserSeniorities() {
    this.adminService.getUserSeniorities().subscribe(data => {
      for (const seniority of data) {
        this.seniorities.push(seniority);
      }
    });
  }

  public addEmployee() {
    this.loading = true;
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeProjects = new Array<object>();

    for (const project of this.selectedProjects) {
      employeeProjects.push(
        {
          projectId: +project.projectId,
        }
      );
    }

    const employeeTechnologies = new Array<object>();

    for (const technology of this.selectedTechnologies) {
      employeeTechnologies.push(
        {
          technologyId: +technology.technologyId,
        }
      );
    }

    this.employee = {
      firstName: this.employeeForm.controls.FirstName.value,
      lastName: this.employeeForm.controls.LastName.value,
      userName: this.employeeForm.controls.FirstName.value + this.employeeForm.controls.LastName.value,
      employeeCode: this.employeeForm.controls.FirstName.value + this.employeeForm.controls.LastName.value,
      email: this.employeeForm.controls.Email.value,
      password: this.employeeForm.controls.Password.value,
      birthDate: this.employeeForm.controls.BirthDate.value,
      phoneNumber: this.employeeForm.controls.PhoneNumber.value,
      grossSalary: +this.employeeForm.controls.GrossSalary.value,
      netSalary: +this.employeeForm.controls.NetSalary.value,
      hourlyPrice: +this.employeeForm.controls.HourlyPrice.value,
      isVatPayer: this.employeeForm.controls.IsVatPayer.value,
      departmentId: +this.employeeForm.controls.DepartmentId.value,
      userRoleId: +this.employeeForm.controls.UserRoleId.value,
      functionId: +this.employeeForm.controls.FunctionId.value,
      seniorityId: +this.employeeForm.controls.SeniorityId.value,
      employeeProject: employeeProjects,
      employeeTechnology: employeeTechnologies
    };

    this.adminService.addEmployee(this.employee).subscribe(
      success => {
        this.loading = false;
        if (success) {
          this.closeDialog(success);
        } else {
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(this.error);
      });
  }

  public updateEmployee() {
    this.loading = true;
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeProjects = new Array<object>();

    for (const project of this.selectedProjects) {
      employeeProjects.push(
        {
          employeeId: +this.data.employeeData.userId,
          projectId: +project.projectId,
        }
      );
    }

    const employeeTechnologies = new Array<object>();

    for (const technology of this.selectedTechnologies) {
      employeeTechnologies.push(
        {
          employeeId: +this.data.employeeData.userId,
          technologyId: +technology.technologyId,
        }
      );
    }

    this.employee = {
      userId: this.data.employeeData.userId,
      firstName: this.employeeForm.controls.FirstName.value,
      lastName: this.employeeForm.controls.LastName.value,
      userName: this.employeeForm.controls.FirstName.value + this.employeeForm.controls.LastName.value,
      employeeCode: this.employeeForm.controls.FirstName.value + this.employeeForm.controls.LastName.value,
      email: this.employeeForm.controls.Email.value,
      password: this.employeeForm.controls.Password.value,
      birthDate: this.employeeForm.controls.BirthDate.value,
      phoneNumber: this.employeeForm.controls.PhoneNumber.value,
      grossSalary: +this.employeeForm.controls.GrossSalary.value,
      netSalary: +this.employeeForm.controls.NetSalary.value,
      hourlyPrice: +this.employeeForm.controls.HourlyPrice.value,
      isVatPayer: this.employeeForm.controls.IsVatPayer.value,
      departmentId: +this.employeeForm.controls.DepartmentId.value,
      userRoleId: +this.employeeForm.controls.UserRoleId.value,
      functionId: +this.employeeForm.controls.FunctionId.value,
      seniorityId: +this.employeeForm.controls.SeniorityId.value,
      employeeProject: employeeProjects,
      employeeTechnology: employeeTechnologies
    };

    this.adminService.updateEmployee(this.employee).subscribe(
      success => {
        this.loading = false;
        if (success) {
          this.closeDialog(success);
        } else {
          this.closeDialog(success);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('this.error', this.error);
        this.closeDialog(this.error);
      });
  }


}
