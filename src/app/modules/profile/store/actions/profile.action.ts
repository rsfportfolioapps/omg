import { Action } from '@ngrx/store';
import { UserInfo } from '../../../auth/models/auth.model';

export enum ProfileActionTypes {
  UpdateAction = '[Profile] Update',
  UpdateSuccessAction = '[Profile] Update Success',
  LoadProfileAction = '[Profile] Load Profile',
  LoadProfileSuccessAction = '[Profile] Load Profile Success'
}

export class Update implements Action {
  readonly type = ProfileActionTypes.UpdateAction;
  constructor(public payload: any) { }
}

export class UpdateSuccess implements Action {
  readonly type = ProfileActionTypes.UpdateSuccessAction;
  constructor(public payload: any) { }
}

export class LoadProfile implements Action {
  readonly type = ProfileActionTypes.LoadProfileAction;
}

export class LoadProfileSuccess implements Action {
  readonly type = ProfileActionTypes.LoadProfileSuccessAction;
  constructor(public payload: Update) {}
}

export type ProfileAction = Update | UpdateSuccess | LoadProfile | LoadProfileSuccess;

