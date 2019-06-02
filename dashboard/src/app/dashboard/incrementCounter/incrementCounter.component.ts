import { IncrementDialogComponent } from './../incrementDialog/incrementDialog.component';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { isNumber } from 'lodash';

@Component({
  selector: 'app-increment-counter',
  templateUrl: './incrementCounter.component.html',
  styleUrls: ['./incrementCounter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncrementCounterComponent implements OnInit, OnDestroy {

  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog,
    protected cd: ChangeDetectorRef,
  ) { }

  private subscription = new Subscription();
  public counter: number;
  isNumber = isNumber;

  ngOnInit() {
    this.subscription.add(
      this.dashboardService.getCounter().pipe(filter(data => !!data)).subscribe(
        data => {
          this.counter = data.counter;
          this.cd.detectChanges();
        },
        err => console.warn(err),
      ),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IncrementDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: true,
      data: this.counter,
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.counter = null;
        this.cd.detectChanges();
        this.dashboardService.incrementCounter().pipe(
          switchMap(() => this.dashboardService.getCounter()),
          take(1),
        ).subscribe(data => {
          this.counter = data.counter;
          this.cd.detectChanges();
        });
      }
    });
  }

}
