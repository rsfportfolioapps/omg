import { createSelector } from '@ngrx/store';
import * as fromHome from '../reducers/home.reducer';

export const homeState = state => state.home;

export const uploadFormCollectionSelector = createSelector(
  homeState,
  fromHome.getUploadFormCollection
);

export const getNewTagSelector = createSelector(
  homeState,
  fromHome.getNewTag
);

export const uploadFormSuccessSelector = createSelector(
  homeState,
  fromHome.getUploadFormSuccess
);
