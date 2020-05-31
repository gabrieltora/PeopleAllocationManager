import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading = true;
  loginForm: FormGroup;
  loginControls: any;
  hidePassword = false;

  constructor() {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });

    this.loginControls = this.loginForm.controls;

    console.log('sunt in login');
  }

  public login() {

  }

}
