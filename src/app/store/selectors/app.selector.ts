import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers/app.reducer';

export const appState = (state) => state.app;

export const userSelector = createSelector(
  appState,
  fromApp.getUser
);
