import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent {

  constructor(private dialogRef: MatDialogRef<SaveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public file: {fileName: string}) {
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.dialogRef.close();
  }

}
