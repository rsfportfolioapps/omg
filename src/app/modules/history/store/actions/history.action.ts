import { Action } from '@ngrx/store';
import { History } from '../../models/history.model';

export enum HistoryActionTypes {
  LoadHistoryAction = '[History] Load History Action',
  LoadHistorySuccessAction = '[History] Load History Action (success)',
  DeleteHistoryAction = '[History] Delete History Action',
}

export class LoadHistory implements Action {
  readonly type = HistoryActionTypes.LoadHistoryAction;
  constructor(public payload: any) {}
}

export class LoadHistorySuccess implements Action {
  readonly type = HistoryActionTypes.LoadHistorySuccessAction;

  constructor(public payload: History) { }
}

export class DeleteHistory implements Action {
  readonly type = HistoryActionTypes.DeleteHistoryAction;
  constructor(public payload: any) {}
}


export type HistoryActions = LoadHistory | LoadHistorySuccess | DeleteHistory;
