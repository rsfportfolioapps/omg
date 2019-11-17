import { createSelector } from '@ngrx/store';
import * as fromProfile from '../reducers/profile.reducer';

export const profileState = (state) => state.profile;

export const profileSelector = createSelector(
  profileState,
  fromProfile.getProfile
);

export const isUpdateSelector = createSelector(
  profileState,
  fromProfile.isUpdated
);

