import { SingleFormComponent } from './single-form/single-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';

const COMPONENTS = [
  TextInputComponent,
  SingleFormComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [
    MODULES,
  ],
  declarations: [
    COMPONENTS,
  ],
  exports: [
    COMPONENTS,
    MODULES,
  ],
})
export class SharedModule {
}
