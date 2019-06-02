import { FormFields, ValidationMessages } from './../../shared/shared.models';
import { SingleFormComponent } from './../../shared/single-form/single-form.component';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends SingleFormComponent implements OnInit {

  validationMessages: ValidationMessages = {
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password min length is 6',
    },
  };

  labels = {
    email : 'Email',
    password : 'Password',
  };

  public formFields: FormFields = {
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.minLength(6)],
  };

  ngOnInit() {
    this.initErrors();
    this.form = this.fb.group(this.getFormModel());
  }

  onSubmit() {
    if (this.form.valid) {
      this.makeRequest = this.auth.signInWithEmail(this.form.value);
      this.submitForm();
    }
    this.updateValidationMessages();
  }

  onSubmitSuccess(response) {
    this.router.navigate(['/dashboard/counter']);
  }
}
