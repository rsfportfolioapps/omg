import { createSelector } from '@ngrx/store';
import * as fromSearch from '../../../search/store/reducers/search.reducer';

export const searchState = (state) => state.search;

export const searchFormCollectionSelector = createSelector(
  searchState,
  fromSearch.getSearchFormCollection,
);

export const searchSelector = createSelector(
  searchState,
  fromSearch.getSearch,
);
