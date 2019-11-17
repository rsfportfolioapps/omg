import { UploadActions, UploadActionTypes } from '../actions/upload.action';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { UploadData, Tags, UploadModel } from '../../models/upload.model';
import { Tag } from 'src/app/models/upload.model';

export interface UploadState {
  data?: UploadData;
  model?: UploadModel
}

const initialState: UploadState = {
  data: null,
  model: null,
};

export function UploadReducer(state: UploadState = initialState, action: UploadActions): UploadState {
  switch (action.type) {
    case UploadActionTypes.loadUploadDetailsSuccess:
      return Object.assign({}, state, { model: action.payload });

    case UploadActionTypes.UploadFile:
      return Object.assign({}, state);

    case UploadActionTypes.LoadUploadFormSuccessAction:
      return Object.assign({}, state, { data: action.payload });

    default:
      return state;
  }
}

export const getDataTags = (state: UploadState) => {
  if (state && state.data) {
    return state.data.tags;
  }
}

export const getModelTags = (state: UploadState) => {
  if (state && state.model) {
    return state.model.tag;
  }
}

export const getModel = (state: UploadState) => {
  if (state && state.model) return state.model
}


export const getData = (state: UploadState) => {
  if (state && state.data) {
    return state.data;
  }
}

// export const getUploadFormSuccess = (state: UploadState) => {
//   if (state && state.uploadFormSuccess) {
//     return state.uploadFormSuccess;
//   }
// }

// export const getNewTag = (state: UploadState) => {
//   if (state && state.tag) {
//     return state.tag;
//   }
// }

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
