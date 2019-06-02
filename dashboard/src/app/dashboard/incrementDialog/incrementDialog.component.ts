import { Component, Inject, Optional, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-increment-dialog',
  templateUrl: './incrementDialog.component.html',
  styleUrls: ['./incrementDialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncrementDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<IncrementDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  get nextCounter() {
    if (this.data === 0) {
      return 1;
    }
    if (this.data === 1) {
      return 2;
    }
    if (this.data > 1) {
      return this.data * 2;
    }
    return null;
  }

}
