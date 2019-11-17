import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UtilityService } from '../../../../services/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { Observable, Subject } from 'rxjs';
import { UploadInfo, UploadData, Categories, Tags, QAs, UploadImage, UploadModel } from '../../models/upload.model';
import { Store, select } from '@ngrx/store';
import { UploadState, getData } from '../../store/reducers/upload.reducer';
import { LoadUploadForm, UploadSave, UploadFile, UploadSendToQa, loadUploadDetails } from '../../store/actions/upload.action';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessage } from 'src/app/models/toast.model';
import { SendQaDialogComponent } from '../send-qa-dialog/send-qa-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { AddSourceDialogComponent } from '../add-source-dialog/add-source-dialog.component';
import { UploadNewDialogComponent } from '../upload-new-dialog/upload-new-dialog.component';
import { getDataSelector, getModelSelector } from '../../store/selectors/upload.selector';
import { environment } from 'src/environments/environment';

/*************************************
 * Refactor this addUpload, newUploadForm, uploadSources, UploadSubmit
 * the logic overcomplicated with a very simple goal
 * ***********************************
 */

/*************************************
 * upload model structure
 * ***********************************
 * categoryId: 1
 * dateUploaded: "2019-09-06T07:03:11.2898409"
 * description: null
 * designer: "Eric Earl1 E. Los Banos1"
 * fileName: "9814cfca-1db4-41f8-9c1d-745433d9aacf.jpg"
 * languageId: 1
 * resourceId: 79
 * tag: [1, 2, 3, 4, 5]
 * fileName: '124dd128-b5a4-491e-a3e1-1c6836c1fe72.jpg'
 * sources: ['124dd128-b5a4-491e-a3e1-1c6836c1fe72.jpg' ]
 */

export type UploadSubmit = (payload: UploadInfo) => void;

@Component({
  selector: 'app-upload-detail-new',
  templateUrl: './upload-detail-new.component.html',
  styleUrls: ['./upload-detail-new.component.scss']
})

export class UploadDetailNewComponent implements OnInit, AfterViewInit {
  private qaData: any = [];
  private blobMainFile: any;

  public uploadForm: FormGroup;
  public formData$: Observable<UploadData>;
  public formModel$: Observable<UploadModel>;
  public blobImgUrl: string = environment.blobImgUrl;
  public categoriesItem: Categories[] = [];
  public tagsListSelectOption: Tags[] = [];
  private sourcesUpload: File[] = [];
  public sourceFileListDisplay: any[] = [];
  public mainFileImage: UploadImage;
  public toastTrigger$ = new Subject<ToastMessage>();
  public qasListSelectOption: QAs[] = [];
  public isShowImageModal: boolean;
  public resourceId: number;
  public mainFile: any;
  public referenceFiles: any;
  public ribbonTitle = 'Files Uploaded';
  public isEditable = true;
  public languages = [];
  public histories = [];

  @ViewChild('newTag', { static: false }) newTag: ElementRef;
  @ViewChild('uploadFormData', { static: false }) uploadFormData: ElementRef;

  public onEditDetails(id: number): void {
    this.store.dispatch(new loadUploadDetails(id));
  }

  constructor(private utilService: UtilityService,
    private uploadService: UploadService,
    private store: Store<UploadState>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    this.formData$ = this.store.pipe(select(getDataSelector));

    this.store.dispatch(new LoadUploadForm());

    //when edit mode
    const resourceId: number = this.activatedRoute.snapshot.params['id'] || null;
    if (resourceId) {
      this.onEditDetails(resourceId);
      this.formModel$ = this.store.pipe(select(getModelSelector));
      this.formModel$.subscribe((model: UploadModel) => {
        if (model) this.flattenResponse(model);
      })
    }

    this.uploadForm = this.formBuilder.group({
      fileName: [null, Validators.compose([Validators.required])],
      description: [null],
      designer: [null],
      dateUploaded: [null],
      languageId: [null, Validators.compose([Validators.required])],
      categoryId: [null, Validators.compose([Validators.required])],
      tags: [null],
      priority: [null],
      status: ['InProgress'],
      mainFileStorageId: [null],
      referenceFiles: [''],
    });
  }

  public get getb64File(): string {
    return localStorage.getItem('uploadedFile') && JSON.parse(localStorage.getItem('uploadedFile')).imgData || null;
  }

  ngAfterViewInit(): void { }

  public getFileReferenceSource(file: any): string {
    return file.absoluteUri;
  }

  public get getFileReference(): string {
    return this.uploadForm.get('fileName').value ?
      this.blobImgUrl + this.uploadForm.get('fileName').value : '';
  }
  /**
   * TODO: refactor on the api side, we need to flatten the response e.g (model.generalInfo.model) 
   * we can discuss this
   */
  public flattenResponse(model: UploadModel): void {
    const infoModel = model.generalInfo.model;
    this.uploadForm.patchValue(infoModel);
 
    //hack patching 
    const tempTags = [{ key: 1, value: "123" }, { key: 2, value: "Skull" }];
    this.uploadForm.get('tags').patchValue(tempTags);
  }

  public fetchUploadInfo(): void {
    this.uploadService.fetchUploadInfo(this.resourceId).subscribe(res => {
      if (res) {
        this.histories = res['histories'];

        const model = res['generalInfo'] && res['generalInfo']['model'];
        const selectedTagIds = _.map(res['tag']['resourceTags'], 'tagId');
        const selectedTagItems = _.filter(res['tag']['tags'], function (p) {
          return _.includes(selectedTagIds, p.key);
        });

        this.uploadForm.get('tags').patchValue(selectedTagItems);

        const mainFile = res['file'] && res['file']['main'];
        this.mainFile = mainFile;

        const referenceFiles = res['file'] && res['file']['references'];
        const referenceFilesIds = _.map(referenceFiles, 'fileStorageId');
        this.referenceFiles = referenceFiles.map(
          (file: any) => {
            return {
              fileUri: file.absoluteUri.toLowerCase(),
              fileType: file.absoluteUri.split('.').pop()
            }
          }
        );

        this.uploadForm.patchValue({
          'fileName': model['fileName'],
          'description': model['description'],
          'designer': model['designer'],
          'dateUploaded': model['dateUploaded'],
          'languageId': model['language'] && model['language']['key'],
          'categoryId': model['category'] && model['category']['key'],
          'courseId': model['course'] && model['course']['key'],
          'tags': selectedTagItems,
          'priority': null,
          'status': ['InProgress'],
          'mainFileStorageId': mainFile['fileStorageId'],
          'referenceFiles': referenceFilesIds
        });

        // this.multiSelect.defaultValue = selectedTagItems
      }
    })
  }

  ngOnInit(): void {
    // if (this.mainFileImage) {
    //   this.uploadForm.get('fileName').patchValue(this.mainFileImage.name);
    // }

    // this.uploadFormSuccess$.subscribe((res) => {
    //   if (res) {
    //     let toast = {} as ToastMessage;
    //     toast.severity = 'success';
    //     toast.summary = 'Success';
    //     toast.detail = `Successfully uploaded.`;
    //     this.toastTrigger$.next(toast);
    //   }
    // });
  }

  public onSelectCategoryChange(event: any): void {
    this.uploadForm.get('categoryId').patchValue(event.value.key);
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

  public onShowImageModal(): void {
    this.isShowImageModal = !this.isShowImageModal;
  }

  public openAddSourceDialog(): void {
    const dialogRef = this.dialog.open(AddSourceDialogComponent, {
      width: '480px'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.selectedSources(res);
      }
    });
  }

  public openMainImageDialog(): void {
    const dialogRef = this.dialog.open(UploadNewDialogComponent, {
      width: '480px'
    });
    dialogRef.afterClosed().subscribe((file) => {
      if (file) {
        this.onFileUpload(file);
      }
    });
  }

  public openConfirmDialog(name: string, index): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '480px',
      data: { fileName: name }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res && this.sourceFileListDisplay.length > 0) {
        this.sourceFileListDisplay.splice(index, 1);
        this.sourcesUpload.splice(index, 1);
        this.referenceFiles.splice(index, 1);
      }
    });
  }

  private async selectedSources(files: FileList) {
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
      this.sourceFileListDisplay.push(fileDisplay);
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

  public onSave(): void {
    const formData = new FormData();
    if (this.uploadForm.valid) {
      formData.append('file', this.blobMainFile, this.mainFileImage.name);
      this.newUploadForm(formData, (payload: UploadInfo) => {
        this.store.dispatch(new UploadSave(payload));
      });
    }
  }

  public onSendToQa(): void {
    let formData = new FormData();
    if (this.uploadForm.valid) {
      formData.append('file', this.blobMainFile, this.mainFileImage.name);
      this.newUploadForm(formData, (payload: UploadInfo) => {
        this.store.dispatch(new UploadSendToQa({
          remark: this.qaData.note,
          qAs: [this.qaData.qAid],
          ...payload
        }));

      });
    }
  }

  private addUpload = (action: UploadSubmit, referenceFilesId?: string[]) => {
    const payload: UploadInfo = {
      fileName: this.uploadForm.value.fileName,
      description: this.uploadForm.value.description,
      languageId: this.uploadForm.value.languageId,
      categoryId: this.uploadForm.value.categoryId,
      tags: _.map(this.uploadForm.value.tags, 'key'),
      priority: this.uploadForm.value.priority,
      status: this.uploadForm.value.status,
      mainFileStorageId: this.uploadForm.value.mainFileStorageId,
      referenceFiles: referenceFilesId ? referenceFilesId : [],
    };
    action(payload);
  }

  private newUploadForm(formData: any, action: UploadSubmit): void {
    this.uploadService.uploadMainFile(formData).subscribe((response: any) => {
      this.uploadForm.get('mainFileStorageId').patchValue(response);
      if (this.sourcesUpload.length > 0) {
        let formDataSource = new FormData();
        for (let i = 0; i < this.sourcesUpload.length; i++) {
          const file = this.sourcesUpload[i];
          formDataSource.append('files', file, file.name);
        }
        this.uploadSources(formDataSource, action, this.addUpload);
      } else {
        this.addUpload(action);
      }

    });
  }

  private uploadSources(formData: any, action: UploadSubmit, callback: any): void {
    this.uploadService.uploadSources(formData).subscribe((response: any) => {
      callback(action, response);
    });
  }

  public openSaveDialog(): void {
    const valid = this.uploadForm.valid;
    if (valid) {
      const dialogRef = this.dialog.open(SaveDialogComponent, {
        width: '480px',
        data: { fileName: this.uploadForm.value.fileName }
      });
    }
  }

  public openSendQADialog(): void {
    const valid = this.uploadForm.valid;
    if (valid) {
      const dialogRef = this.dialog.open(SendQaDialogComponent, {
        width: '450px',
        data: this.qasListSelectOption
      });

      dialogRef.afterClosed().subscribe((qa: any) => {
        if (qa) {
          this.qaData = qa;
          this.onSendToQa();
        }
      });
    }
  }

  public getLanguage(languageId: number) {
    if (!this.languages) {
      return 'n/a'
    }

    const lang = _.find(this.languages, { key: languageId });
    return lang && lang['value'];
  }

  public toggleEdit(): void {
    this.isEditable = !this.isEditable;
  }
}
