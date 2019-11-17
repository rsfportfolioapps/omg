import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeState } from '../../store/reducers/home.reducer';
import { UploadFile } from '../../store/actions/home.action';
import { UtilityService } from '../../../../services/utility.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public dataUri: Observable<string>;
  constructor(private store: Store<HomeState>,
              private utilService: UtilityService) { }

  ngOnInit() {}

  public onFileUpload(event: File): void {
    const fileName = event[0].name;
    this.utilService.convertBlobToBase64(event[0]).subscribe((b64Result) => {
      this.store.dispatch(new UploadFile({name: fileName, imgData: b64Result}));
    });
  }
}
