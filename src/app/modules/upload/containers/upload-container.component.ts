import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UploadState } from '../store/reducers/upload.reducer';
import { LoadUploadForm } from '../../home/store/actions/home.action';

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrls: ['./upload-container.component.scss']
})
export class UploadContainerComponent implements OnInit {
  constructor(private store: Store<UploadState>) {
    
  }

  public events: string[] = [];
  public opened: boolean;

  ngOnInit(): void { }
}
