import { createSelector } from '@ngrx/store';
import * as fromHistory from '../reducers/history.reducer';

export const historyState = state => state.history;

export const getHistoryListSelector = createSelector(
  historyState,
  fromHistory.getHistoryList
);
