import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  public onClose(): void {
    this.dialogRef.close();
  }

}
