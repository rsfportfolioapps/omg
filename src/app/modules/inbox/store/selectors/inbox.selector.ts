import { createSelector } from '@ngrx/store';
import * as fromInbox from '../reducers/inbox.reducer';

export const inboxState = state => state.inbox;

export const getInboxListSelector = createSelector(
  inboxState,
  fromInbox.getInboxList
);
