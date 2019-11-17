import { Action } from '@ngrx/store';
import { UploadInfo, UploadData, Tags, UploadModel } from '../../models/upload.model';
import { Tag } from 'src/app/models/upload.model';

export enum UploadActionTypes {
  UploadFile = '[Upload] Upload File (change)',
  LoadUploadFormAction = '[Upload] Load Upload Form',
  LoadUploadFormSuccessAction = '[Upload] Load Upload Form Success',
  AddTagAction = '[Upload] Add Tag Action',
  AddTagSuccessAction = '[Upload] Add Tag Success',
  UploadSaveAction = '[Upload] Upload Save Action',
  UploadSaveSuccessAction = '[Upload] Upload Save Success',
  UploadSendToQaAction = '[Upload] Upload Send To Qa Action',
  loadUploadDetails = '[Upload] load details',
  loadUploadDetailsSuccess = '[Upload] load details success'
}

export class loadUploadDetails implements Action {
  readonly type = UploadActionTypes.loadUploadDetails;
  constructor(public payload: number) { }
}

export class loadUploadDetailsSuccess implements Action {
  readonly type = UploadActionTypes.loadUploadDetailsSuccess;
  constructor(public payload: UploadModel) { }
}

export class UploadFile implements Action {
  readonly type = UploadActionTypes.UploadFile;
  constructor(public payload: { name: string, imgData: any }) { }
}

export class LoadUploadForm implements Action {
  readonly type = UploadActionTypes.LoadUploadFormAction;
}

export class LoadUploadFormSuccess implements Action {
  readonly type = UploadActionTypes.LoadUploadFormSuccessAction;
  constructor(public payload: UploadData) { }
}

export class AddTagAction implements Action {
  readonly type = UploadActionTypes.AddTagAction;
  constructor(public payload: string) { }
}

export class UploadSave implements Action {
  readonly type = UploadActionTypes.UploadSaveAction;
  constructor(public payload: UploadInfo) { }
}

export class UploadSaveSuccess implements Action {
  readonly type = UploadActionTypes.UploadSaveSuccessAction;
  constructor(public payload: any) { }
}

export class UploadSendToQa implements Action {
  readonly type = UploadActionTypes.UploadSendToQaAction;
  constructor(public payload: UploadInfo) { }
}

export type UploadActions = loadUploadDetails | loadUploadDetailsSuccess | UploadFile | LoadUploadForm | LoadUploadFormSuccess | AddTagAction | UploadSave | UploadSaveSuccess | UploadSendToQa;
