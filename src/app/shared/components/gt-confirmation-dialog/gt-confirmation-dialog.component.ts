import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './gt-confirmation-dialog.component.html',
  styleUrls: ['./gt-confirmation-dialog.component.scss'],
})
export class GTConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<GTConfirmationDialogComponent>) {}

  public confirmMessage: string;
}
