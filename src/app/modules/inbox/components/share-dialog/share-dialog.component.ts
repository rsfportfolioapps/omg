import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastMessage } from 'src/app/models/toast.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

  public shareLink: string;
  public fileUrl: any;
  public toastTrigger$ = new Subject<ToastMessage>();

  constructor(private dialogRef: MatDialogRef<ShareDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public link: string) {

    this.shareLink = link;
  }

  ngOnInit() {
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onCopySucess(event: any): void {
    if (event) {
      let toast = {} as ToastMessage;
      toast.severity = 'success';
      toast.summary = 'Copied';
      toast.detail = `Link copied to clipboard.`;
      this.toastTrigger$.next(toast);
    }
  }

}
