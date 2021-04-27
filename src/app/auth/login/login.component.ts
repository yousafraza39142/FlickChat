import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Form Controls with validators
  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  keepLoggedIn = new FormControl(false);

  // Form
  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
    keepLoggedIn: this.keepLoggedIn,
  }, {updateOn: 'blur'});

  constructor() {
  }


  ngOnInit(): void {
  }


  onSubmit(): void {
  }


  onCancel(): void {
    this.clearValues();
    this.clearErrors();
  }


  private clearValues(): void {
    this.loginForm.reset();
  }


  private clearErrors(): void {
    this.email.setErrors(null);
    this.password.setErrors(null);
  }
}
