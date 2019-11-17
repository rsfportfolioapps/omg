import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastMessage } from 'src/app/models/toast.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-share-link-dialog',
  templateUrl: './share-link-dialog.component.html',
  styleUrls: ['./share-link-dialog.component.scss']
})
export class ShareLinkDialogComponent {

  @Input()
  public shareLink: string;

  @Input()
  public shareDialog = [];

  @Input()
  public index: number;

  @Output()
  public shareDialogEmitter = new EventEmitter<boolean>();

  public isShowShareDialog = [];

  public toastTrigger$ = new Subject<ToastMessage>();

  public onCopySucess(event: any): void {
    if (event) {
      let toast = {} as ToastMessage;
      toast.severity = 'success';
      toast.summary = 'Copied';
      toast.detail = `Link copied to clipboard.`;
      this.toastTrigger$.next(toast);
    }
  }

  public toggleShareDialog(i): void {
    this.shareDialogEmitter.emit(this.isShowShareDialog[i]);
  } 

}
