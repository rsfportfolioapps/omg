import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  public fileName: string;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public file: string) {

    this.fileName = file;
  }

  ngOnInit() {
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.dialogRef.close({confirm: true});
  }
}
