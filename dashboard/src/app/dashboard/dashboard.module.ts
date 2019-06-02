import { SharedModule } from './../shared/shared.module';
import { IncrementDialogComponent } from './incrementDialog/incrementDialog.component';
import { MatDialogModule } from '@angular/material';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { DashboardService } from './services/dashboard.service';
import { IncrementCounterComponent } from './incrementCounter/incrementCounter.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    IncrementCounterComponent,
    IncrementDialogComponent,
  ],
  providers: [
    DashboardService,
  ],
  entryComponents: [
    IncrementDialogComponent,
  ]
})
export class DashboardModule { }
