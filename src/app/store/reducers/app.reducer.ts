import { AppActions, AppActionTypes } from '../actions/app.action';
import { User } from 'src/app/modules/auth/models/auth.model';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export interface AppState {
  user?: User;
  isLoggedIn: boolean;
}

const initialState: AppState = {
  user: null,
  isLoggedIn: false
};

export function AppReducer(state: AppState = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.LoadApp:
      return Object.assign({}, state);

    case AppActionTypes.LoadAppSuccess:
      return Object.assign({}, action.payload);

    case AppActionTypes.IsLogin:
      return Object.assign({}, state, {
        isLoggedIn: action.payload.isLogin,
        user: action.payload.user
      });

    default:
      return state;
  }
}

export const isLoggedIn = (state) => {
  return state.isLoggedIn;
};

export const getUser = (state) => state.user;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

