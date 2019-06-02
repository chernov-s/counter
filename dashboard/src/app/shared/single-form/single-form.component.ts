import { FormErrors, ValidationMessages } from './../shared.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-single-form',
  template: '',
})
export class SingleFormComponent implements OnInit {

  constructor(
    protected auth: AuthService,
    protected fb: FormBuilder,
    protected router: Router,
    protected snackBar: MatSnackBar,
  ) { }

  form: FormGroup;
  formFields = {};
  public formErrors: FormErrors = {};
  sending = false;
  sent = false;
  labels = {};

  makeRequest: Observable<any> = of(null);

  validationMessages: ValidationMessages = {};

  ngOnInit() {
    this.form = this.fb.group(this.getFormModel());
  }

  getFormModel() {
    const model = {};
    for (const name of Object.keys(this.formFields)) {
      if (this.formFields[name]) {
        model[name] = ['', this.formFields[name]];
      } else {
        model[name] = '';
      }
      this.formErrors[name] = '';
    }
    return model;
  }

  protected initErrors() {
    const keys = Object.keys(this.validationMessages);
    const errors = {};
    for (const k of keys) {
      errors[k] = '';
    }
    this.formErrors = errors;
  }

  protected makeMessage(messages, control: AbstractControl, field: string, key: string): string {
    let message = '';

    if (messages && key in messages) {
      message = messages[key];
      if (message.indexOf('%label') >= 0 && this.labels[field]) {
        message = message.replace('%label', this.labels[field]);
      }

    } else if (typeof control.errors[key] === 'string') {
      message = control.errors[key];
    } else {
      message = key;
    }
    return message;
  }

  updateValidationMessages() {
    const formGroup = this.form;
    if (!formGroup) {
      return;
    }

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
        this.formErrors[field] = '';

        const control = formGroup.get(field);
        if (!control) {
          continue;
        }
        if (this.isControlHasErrors(control)) {
          control.markAsTouched();
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += this.makeMessage(messages, control, field, key);
              break;
            }
          }
        }
      }
    }

  }

  protected isControlHasErrors(control): boolean {
    return control && control.enabled && !control.valid;
  }

  submitForm() {
    if (this.form.valid) {
      this.sending = true;
      this.sent = false;
      this.makeRequest.subscribe(
        response => {
          this.sending = false;
          this.sent = true;
          this.onSubmitSuccess(response);
        },
        error => {
          this.sending = false;
          this.onSubmitFail(error);
        },
      );
    }
  }

  onSubmitSuccess(response) {
    console.log('success', response);
  }

  onSubmitFail(error) {
    this.snackBar.open(error.message, 'close', { duration: 5000, });
  }


}
