import { Action } from '@ngrx/store';
import { User } from 'src/app/modules/auth/models/auth.model';

export enum AppActionTypes {
  LoadApp = '[App] Load App',
  LoadAppSuccess = '[App] Load App (success)',
  IsLogin = '[App] IsLogin (success)'
}

export class LoadApp implements Action {
  readonly type = AppActionTypes.LoadApp;
}

export class LoadAppSuccess implements Action {
  readonly type = AppActionTypes.LoadAppSuccess;

  constructor(public payload: any) { }
}

export class IsLoggin implements Action {
  readonly type = AppActionTypes.IsLogin;

  constructor(public payload: { isLogin: boolean, user: User }) { }
}

export type AppActions = LoadApp | LoadAppSuccess | IsLoggin;
