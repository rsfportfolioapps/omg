import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { storeFreeze } from 'ngrx-store-freeze';
import {SearchFormCollection} from '../../models/search.model';
import {SearchAction, SearchActionTypes} from '../actions/search.action';

export interface SearchState {
  search?: any;
  searchForm?: SearchFormCollection;
  uploadFormSuccess?: any;
}

const initialState: SearchState = {
  search: null,
  searchForm: null,
  uploadFormSuccess: null
};

export function SearchReducers(state: SearchState = initialState, action: SearchAction): SearchState {
  switch (action.type) {
    case SearchActionTypes.LoadSearchSuccessAction:
      return Object.assign({}, state, {
        search: action.payload
      });
    case SearchActionTypes.LoadSearchFormSuccessAction:
      return Object.assign({}, state, {
        searchForm: action.payload
      });

    default:
      return state;
  }
}

export const getSearch = (state: SearchState) => state.search;

export const getSearchFormCollection = (state: SearchState) => state.searchForm;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
