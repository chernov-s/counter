import { SharedModule } from './../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    AuthService,
  ],
})
export class AuthModule { }
