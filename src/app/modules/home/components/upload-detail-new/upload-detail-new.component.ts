import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilityService } from '../../../../services/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { uploadFormCollectionSelector, getNewTagSelector, uploadFormSuccessSelector } from '../../store/selectors/home.selector';
import { Observable, Subject } from 'rxjs';
import { UploadInfo, UploadFormCollection, Categories, Tags, QAs, UploadImage } from '../../models/home.model';
import { Store, select } from '@ngrx/store';
import { HomeState } from '../../store/reducers/home.reducer';
import { LoadUploadForm, AddTag, UploadForm, UploadFile } from '../../store/actions/home.action';
import { Router } from '@angular/router';
import { ToastMessage } from 'src/app/models/toast.model';
import { SendQaDialogComponent } from '../send-qa-dialog/send-qa-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-detail-new',
  templateUrl: './upload-detail-new.component.html',
  styleUrls: ['./upload-detail-new.component.scss']
})
export class UploadDetailNewComponent implements OnInit {

  public uploadForm: FormGroup;
  private blobMainFile: any;
  public uploadForm$: Observable<UploadFormCollection>;
  public uploadFormSuccess$: Observable<any>;
  public categoriesItem: Categories[] = [];
  private selectedTagIds: number[];
  public selectedTagItems: Tags[] = [];
  public tagsListSelectOption: Tags[] = [];
  public newTag$: Observable<Tags>;
  private sourcesUpload: File[] = [];
  public soucreFileListDisplay: any[] = [];
  public mainFileImage: UploadImage;
  public toastTrigger$ = new Subject<ToastMessage>();
  public qasListSelectOption: QAs[] = [];
  private qaData: any = [];
  public isShowImageModal: boolean;

  @ViewChild('newTag', { static: false }) newTag: ElementRef;
  @ViewChild('uploadFormData', { static: false }) uploadFormData: ElementRef;

  constructor(private utilService: UtilityService,
    private homeService: HomeService,
    private store: Store<HomeState>,
    private formBuilder: FormBuilder,
    private route: Router,
    private dialog: MatDialog) {

    this.uploadForm$ = this.store.pipe(select(uploadFormCollectionSelector));
    this.uploadFormSuccess$ = this.store.pipe(select(uploadFormSuccessSelector));
    this.uploadForm$.subscribe((res) => {
      if (res) {
        this.tagsListSelectOption = res.tags;
        this.qasListSelectOption = res.qAs;
      }
    });

    this.newTag$ = this.store.pipe(select(getNewTagSelector));
    this.store.dispatch(new LoadUploadForm());

    this.mainFileImage = JSON.parse(localStorage.getItem('uploadedFile'));
    if (this.mainFileImage) {
      this.blobMainFile = this.utilService.convertBase64DatatoBlob(this.mainFileImage.imgData);
    }

    this.uploadForm = this.formBuilder.group({
      fileName: [null, Validators.compose([Validators.required])],
      description: [null],
      languageId: [null, Validators.compose([Validators.required])],
      categoryId: [null, Validators.compose([Validators.required])],
      tags: [null],
      priority: [null, Validators.compose([Validators.required])],
      status: ['InProgress'],
      mainFileStorageId: [null, Validators.compose([Validators.required])],
      referenceFiles: [null],
    });
  }

  ngOnInit(): void {
    if (this.mainFileImage) {
      this.uploadForm.get('fileName').patchValue(this.mainFileImage.name);
    }
    
    this.newTag$.subscribe((newTag) => {
      if (newTag) {
        this.selectedTagItems.push(newTag);
        this.selectedTagIds.push(newTag.key);
        this.uploadForm.get('tags').patchValue(this.selectedTagIds);
        this.tagsListSelectOption = this.tagsListSelectOption.concat(newTag);
        this.newTag.nativeElement.value = '';
      }
    });

    this.uploadFormSuccess$.subscribe((res) => {
      if (res) {
        let toast = {} as ToastMessage;
        toast.severity = 'success';
        toast.summary = 'Success';
        toast.detail = `Successfully uploaded.`;
        this.toastTrigger$.next(toast);
        setTimeout(() => {
          this.route.navigateByUrl('home');
        }, 3500);
      }
    });
  }

  public onSelectCategoryChange(event: any): void {
    this.uploadForm.get('categoryId').patchValue(event.value.key);
  }

  public onSelectTagChange(event: any): void {
    this.selectedTagItems = event.value;
    this.selectedTagIds = [];
    this.selectedTagItems.forEach(tag => {
      this.selectedTagIds.push(tag.key);
      this.uploadForm.get('tags').patchValue(this.selectedTagIds);
    });
  }

  public async onFileUpload(event: any) {
    this.blobMainFile = event[0];
    this.mainFileImage.name = this.blobMainFile.name;
    this.mainFileImage.imgData = await this.createImageFromBlob(this.blobMainFile);
    this.uploadForm.get('fileName').patchValue(this.mainFileImage.name);

    this.utilService.convertBlobToBase64(this.blobMainFile).subscribe((b64Result) => {
      this.store.dispatch(new UploadFile({ name: this.mainFileImage.name, imgData: b64Result }));
    });
  }

  public onAddNewTag(): void {
    this.store.dispatch(new AddTag(this.newTag.nativeElement.value));
  }

  public onFileChangeEvent(event: any): void {
    this.selectedSources(event.target.files);
  }

  public onShowImageModal(): void {
    this.isShowImageModal = !this.isShowImageModal;
  }

  private async selectedSources(files: any) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let fileDisplay = [];
      const fileType = file.name.split('.').pop();

      fileDisplay['name'] = file.name;
      fileDisplay['type'] = fileType;
      if (fileType === '.zip') {
        fileDisplay['file'] = file;
      } else {
        fileDisplay['file'] = await this.createImageFromBlob(file);
      }
      this.soucreFileListDisplay.push(fileDisplay);
      this.sourcesUpload.push(file);
    }
  }

  private createImageFromBlob(img: any): any {
    return new Promise(function (resolve) {
      let reader = new FileReader();
      reader.onloadend = function (e: any) {
        resolve(e.target.result);
      };
      reader.readAsDataURL(img);
    });
  }

  public onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.blobMainFile, this.mainFileImage.name);
    this.newUploadForm(formData);
  }

  private addUpload = (referenceFilesId?: string[]) => {
    const payload: UploadInfo = {
      remark: this.qaData.note,
      qAs: this.qaData.qAid,
      fileName: this.uploadForm.value.fileName,
      description: this.uploadForm.value.description,
      languageId: this.uploadForm.value.languageId,
      categoryId: this.uploadForm.value.categoryId,
      tags: this.uploadForm.value.tags,
      priority: this.uploadForm.value.priority,
      status: this.uploadForm.value.status,
      mainFileStorageId: this.uploadForm.value.mainFileStorageId,
      referenceFiles: referenceFilesId,
    };
    this.store.dispatch(new UploadForm(payload));
  }

  private newUploadForm(formData: any): void {
    this.homeService.uploadMainFile(formData).subscribe((response: any) => {
      this.uploadForm.get('mainFileStorageId').patchValue(response);
      if (this.sourcesUpload.length > 0) {
        const formDataSource = new FormData();
        for (let i = 0; i < this.sourcesUpload.length; i++) {
          const file = this.sourcesUpload[i];
          formDataSource.append('files', file, file.name);
        }
        this.uploadSources(formDataSource, this.addUpload);
      } else {
        this.addUpload();
      }
    });
  }

  private uploadSources(formData: any, callback: any): void {
    this.homeService.uploadSources(formData).subscribe((response: any) => {
      callback(response);
    });
  }

  public openSendQADialog(): void {
    const dialogRef = this.dialog.open(SendQaDialogComponent, {
      width: '450px',
      data: this.qasListSelectOption
    });

    dialogRef.afterClosed().subscribe((qa: any) => {
      if (qa) {
        this.qaData = qa;
        this.onSubmit();
      }
    });
  }
}
