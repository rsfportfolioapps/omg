import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-source-dialog',
  templateUrl: './add-source-dialog.component.html',
  styleUrls: ['./add-source-dialog.component.scss']
})

export class AddSourceDialogComponent {

  public file: FileList;

  constructor(
    public dialogRef: MatDialogRef<AddSourceDialogComponent>
  ) { }

  public onFileUpload(event: FileList): void {
    this.file = event;
    this.onClose(this.file);
  }

  public onFileChangeEvent(event: Event): void {
    this.file = event.target['files'];
    this.onClose(this.file);
  }

  public onClose(file: FileList): void {
    this.dialogRef.close(file);
  }

}
