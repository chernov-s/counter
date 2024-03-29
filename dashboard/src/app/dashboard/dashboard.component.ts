import { AuthService } from './../auth/services/auth.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
  ) { }

  signOut() {
    this.authService.signOut();
  }

}
