import { HistoryActions, HistoryActionTypes } from '../actions/history.action';
import { History } from '../../models/history.model';

export interface HistoryState {
  history?: History;
  deleteSuccess?: boolean;
}

const initialState: HistoryState = {
  history: null,
  deleteSuccess: false
};

export function HistoryReducer(state: HistoryState = initialState, action: HistoryActions): HistoryState {
  switch (action.type) {
    case HistoryActionTypes.LoadHistoryAction:
      return Object.assign({}, state);

    case HistoryActionTypes.LoadHistorySuccessAction:
      return Object.assign({}, state, {
        history: action.payload
      });
    
    case HistoryActionTypes.DeleteHistoryAction:
      return Object.assign({}, state, {
        history: action.payload.history
      });

    default:
      return state;
  }
}

export const getHistoryList = (state: HistoryState) => state.history;
