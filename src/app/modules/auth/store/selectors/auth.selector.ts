import { createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const authState = (state) => state.auth;

export const isLoggedInSelector = createSelector(
  authState,
  fromAuth.isLoggedIn
);

export const registerCollectionSelector = createSelector(
  authState,
  fromAuth.getRegisterCollection
);

export const isRegisterSelector = createSelector(
  authState,
  fromAuth.isRegistered
);

