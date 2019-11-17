import { HomeActions, HomeActionTypes } from '../actions/home.action';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { UploadFormCollection, Tags } from '../../models/home.model';

export interface HomeState {
  uploadForm?: UploadFormCollection;
  tag?: Tags;
  uploadFormSuccess?: any;
}

const initialState: HomeState = {
  uploadForm: null,
  tag: null,
  uploadFormSuccess: null
};

export function HomeReducer(state: HomeState = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case HomeActionTypes.LoadHome:
      return Object.assign({}, state);

    case HomeActionTypes.LoadHomeSuccess:
      return Object.assign({}, action.payload);

    case HomeActionTypes.UploadFile:
      return Object.assign({}, state);

    case HomeActionTypes.LoadUploadFormSuccessAction:
      return Object.assign({}, state, {
        uploadForm: action.payload
      });

    case HomeActionTypes.AddTagSuccessAction:
      return Object.assign({}, state, {
        tag: action.payload
      });

    case HomeActionTypes.UploadFormSuccessAction:
        return Object.assign({}, state, {
          uploadFormSuccess: action.payload
      });

    default:
      return state;
  }
}

export const getUploadFormCollection = (state: HomeState) => state.uploadForm;

export const getUploadFormSuccess = (state: HomeState) => state.uploadFormSuccess;

export const getNewTag = (state: HomeState) => state.tag;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
