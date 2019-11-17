import { AuthActions, AuthActionTypes } from '../actions/auth.action';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { storeFreeze } from 'ngrx-store-freeze';
import { User, RegisterCollection } from '../../models/auth.model';

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
  register?: RegisterCollection;
  isRegistered: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  register: null,
  isRegistered: false
};

export function AuthReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return Object.assign({}, state);

    case AuthActionTypes.LoginSuccessAction:
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: action.payload
      });

    case AuthActionTypes.LogoutAction:
        return Object.assign({}, state, {
          isLoggedIn: false,
          user: null
        });

    case AuthActionTypes.RegisterSuccessAction:
      return Object.assign({}, state, {
        isRegistered: action.payload
      });

    case AuthActionTypes.LoadRegisterSuccessAction:
      return Object.assign({}, state, {
        register: action.payload
      });

    default:
      return state;
  }
}

export const getRegisterCollection = (state: AuthState) => state.register;

export const isLoggedIn = (state: AuthState) => state.isLoggedIn;

export const isRegistered = (state: AuthState) => state.isRegistered;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

