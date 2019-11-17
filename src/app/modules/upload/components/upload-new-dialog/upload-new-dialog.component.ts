import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-upload-new-dialog',
  templateUrl: './upload-new-dialog.component.html',
  styleUrls: ['./upload-new-dialog.component.scss']
})
export class UploadNewDialogComponent {

  public file: FileList;

  constructor(
    private dialogRef: MatDialogRef<UploadNewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
