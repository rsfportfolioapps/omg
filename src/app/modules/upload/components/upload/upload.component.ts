import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UploadState } from '../../store/reducers/upload.reducer';
import { UploadFile } from '../../store/actions/upload.action';
import { UtilityService } from '../../../../services/utility.service';
import { Observable, Subject, pipe } from 'rxjs';
import { ToastMessage } from 'src/app/models/toast.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public dataUri: Observable<string>;
  public imgTypes: 'image/jpeg' | 'image/png';

  // public styles = {
  //   'width': '100%',
  //   'max-width.px': 475,
  //   'padding': '70px 20px 24px 20px',
  //   'border-radius': 'inherit'
  // };
  public toastTrigger$ = new Subject<ToastMessage>();

  constructor(private store: Store<UploadState>, private utilService: UtilityService) { }

  ngOnInit() { }

  public onFileUpload(file: File): void {
    if (this.isFileTypeImage(file)) {
      this.utilService.convertBlobToBase64(file[0]).pipe(map(b64File => {
        return { name: file[0].name, imgData: b64File }
      })).subscribe((result) => {
        this.store.dispatch(new UploadFile(result));
      });
    } else {
      let toast = {} as ToastMessage;
      toast.severity = 'error';
      toast.summary = 'Error';
      toast.detail = 'Invalid file type (Accepts only image files)';
      this.toastTrigger$.next(toast);
    }
  }

  private isFileTypeImage(file: File): boolean {
    return (file[0].type === this.imgTypes) ? true : false;
  }
}
