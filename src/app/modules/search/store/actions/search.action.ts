import { Action } from '@ngrx/store';


export enum SearchActionTypes {
  LoadSearchAction = '[Search] Load Search',
  LoadSearchSuccessAction = '[Search] Load Search Success',
  LoadSearchFormAction = '[Search] Load Search Form',
  LoadSearchFormSuccessAction = '[Search] Load Search Form Success',
}

export class LoadSearch implements Action {
  readonly type = SearchActionTypes.LoadSearchAction;
  constructor(public payload: any) {}
}

export class LoadSearchSuccess implements Action {
  readonly type = SearchActionTypes.LoadSearchSuccessAction;
  constructor(public payload: any) {}
}

export class LoadSearchForm implements Action {
  readonly type = SearchActionTypes.LoadSearchFormAction;
}

export class LoadSearchFormSuccess implements Action {
  readonly type = SearchActionTypes.LoadSearchFormSuccessAction;
  constructor(public payload) {}
}

export type SearchAction = LoadSearch | LoadSearchSuccess | LoadSearchForm | LoadSearchFormSuccess;
