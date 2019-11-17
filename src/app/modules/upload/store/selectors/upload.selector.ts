import { createSelector } from '@ngrx/store';
import * as fromUpload from '../reducers/upload.reducer';

export const uploadState = state => state.upload;

export const getModelTagsSelector = createSelector(
  uploadState,
  fromUpload.getModelTags
);

export const getDataTagsSelector = createSelector(
  uploadState,
  fromUpload.getDataTags
);

export const getModelSelector = createSelector(
  uploadState,
  fromUpload.getModel
);

export const getDataSelector = createSelector(
  uploadState,
  fromUpload.getData
);

// export const uploadFormSuccessSelector = createSelector(
//   uploadState,
//   fromUpload.getUploadFormSuccess
// );
