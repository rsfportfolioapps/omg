import { Action } from '@ngrx/store';
import { User, LoginInfo, RegisterCollection, UserInfo } from '../../models/auth.model';

export enum AuthActionTypes {
  LoginAction = '[Login] Load Login',
  LoginSuccessAction = '[Login] Load Login Success',
  RegisterAction = '[Register] Register',
  RegisterSuccessAction = '[Register] Register Success',
  LoadRegisterAction = '[Register] Load Register',
  LoadRegisterSuccessAction = '[Register] Load Register Success',
  LogoutAction = '[Logout] Load Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public payload: LoginInfo) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccessAction;
  constructor(public payload: User) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export class Register implements Action {
  readonly type = AuthActionTypes.RegisterAction;
  constructor(public payload: UserInfo) { }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccessAction;
  constructor(public payload: any) { }
}

export class LoadRegister implements Action {
  readonly type = AuthActionTypes.LoadRegisterAction;
}

export class LoadRegisterSuccess implements Action {
  readonly type = AuthActionTypes.LoadRegisterSuccessAction;
  constructor(public payload: Register) {}
}

export type AuthActions = Login | LoginSuccess | Logout | Register | RegisterSuccess | LoadRegister | LoadRegisterSuccess;

