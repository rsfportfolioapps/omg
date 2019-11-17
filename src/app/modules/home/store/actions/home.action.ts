import { Action } from '@ngrx/store';
import { UploadInfo, UploadFormCollection, Tags } from '../../models/home.model';

export enum HomeActionTypes {
  LoadHome = '[Home] Load Home',
  LoadHomeSuccess = '[Home] Load Home (success)',
  UploadFile = '[Home] Upload File (change)',
  LoadUploadFormAction = '[Home] Load Upload Form',
  LoadUploadFormSuccessAction = '[Home] Load Upload Form Success',
  AddTagAction = '[Home] Add Tag Action',
  AddTagSuccessAction = '[Home] Add Tag Success',
  UploadFormAction = '[Home] Upload Form Action',
  UploadFormSuccessAction = '[Home] Upload Form Success'
}

export class LoadHome implements Action {
  readonly type = HomeActionTypes.LoadHome;
}

export class LoadHomeSuccess implements Action {
  readonly type = HomeActionTypes.LoadHomeSuccess;

  constructor(public payload: any) { }
}

export class UploadFile implements Action {
  readonly type = HomeActionTypes.UploadFile;
  constructor(public payload: { name: string, imgData: any }) { }
}

export class LoadUploadForm implements Action {
  readonly type = HomeActionTypes.LoadUploadFormAction;
}

export class LoadUploadFormSuccess implements Action {
  readonly type = HomeActionTypes.LoadUploadFormSuccessAction;
  constructor(public payload: UploadFormCollection) {}
}

export class AddTag implements Action {
  readonly type = HomeActionTypes.AddTagAction;
  constructor(public newTag: string) {}
}

export class AddTagSuccess implements Action {
  readonly type = HomeActionTypes.AddTagSuccessAction;
  constructor(public payload: Tags) {}
}

export class UploadForm implements Action {
  readonly type = HomeActionTypes.UploadFormAction;
  constructor(public payload: UploadInfo) {}
}

export class UploadFormSuccess implements Action {
  readonly type = HomeActionTypes.UploadFormSuccessAction;
  constructor(public payload: any) {}
}

export type HomeActions = LoadHome | LoadHomeSuccess | UploadFile | LoadUploadForm | LoadUploadFormSuccess | AddTag | AddTagSuccess | UploadForm | UploadFormSuccess;
