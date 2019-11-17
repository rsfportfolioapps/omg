import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  public imageChangedEvent: any;
  public croppedImage: any;
  private file: File;
  public showCroppingDialog = false;

  @Input()
  public parentForm: FormGroup;

  @Input()
  public imageDisplayUrl: string;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onChangeEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onFileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.showCroppingDialog = true;
    this.file = event.target.files[0];
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    event.file['name'] = this.file.name;

    this.onChangeEvent.emit(event.file);
  }
}
