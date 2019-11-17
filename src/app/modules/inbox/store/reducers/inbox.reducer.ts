import { InboxActions, InboxActionTypes } from '../actions/inbox.action';
import { Inbox } from '../../models/inbox.model';

export interface InboxState {
  inbox?: Inbox;
  deleteSuccess?: boolean;
}

const initialState: InboxState = {
  inbox: null,
  deleteSuccess: false
};

export function InboxReducer(state: InboxState = initialState, action: InboxActions): InboxState {
  switch (action.type) {
    case InboxActionTypes.LoadInboxAction:
      return Object.assign({}, state);

    case InboxActionTypes.LoadInboxSuccessAction:
      return Object.assign({}, state, {
        inbox: action.payload
      });

    case InboxActionTypes.DeleteInboxAction:
      return Object.assign({}, state, {
        inbox: action.payload.inbox
      });

    default:
      return state;
  }
}

export const getInboxList = (state: InboxState) => state.inbox;
