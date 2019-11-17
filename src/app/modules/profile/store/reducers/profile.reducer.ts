import { ProfileAction, ProfileActionTypes } from '../actions/profile.action';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { storeFreeze } from 'ngrx-store-freeze';
import { UserInfo } from '../../../auth/models/auth.model';

export interface ProfileState {
  profile?: UserInfo;
  isUpdated: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isUpdated: false
};

export function ProfileReducer(state: ProfileState = initialState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.UpdateSuccessAction:
      return Object.assign({}, state, {
        isUpdated: action.payload
      });
    case ProfileActionTypes.LoadProfileSuccessAction:
      return Object.assign({}, state, {
        profile: action.payload
      });

    default:
      return state;
  }
}

export const getProfile = (state: ProfileState) => state.profile;

export const isUpdated = (state: ProfileState) => state.isUpdated;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

