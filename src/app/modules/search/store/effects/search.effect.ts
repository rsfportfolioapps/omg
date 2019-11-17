import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { SearchState } from '../reducers/search.reducer';
import { SearchService } from '../../services/search.service';
import { SearchActionTypes } from '../actions/search.action';
import { SearchFormCollection } from '../../models/search.model';


@Injectable()
export class SearchEffects {
  constructor(private searchService: SearchService,
    private route: Router,
    private store: Store<SearchState>,
    private actions$: Actions) { }

  @Effect({ dispatch: true })
  public loadSearch$: Observable<any> = this.actions$.pipe(
    ofType(SearchActionTypes.LoadSearchAction),
    mergeMap((action: any) =>
      this.searchService.getSearch(action.payload).pipe(
        map((res) => {
          return {
            type: SearchActionTypes.LoadSearchSuccessAction,
            payload: res
          };
        }),
        catchError(() => {
          return of({});
        })
      ))
  );

  @Effect({ dispatch: true })
  public loadSearchForm$: Observable<any> = this.actions$.pipe(
    ofType(SearchActionTypes.LoadSearchFormAction),
    mergeMap((action: SearchFormCollection) =>
      this.searchService.getSearchForm().pipe(
        map((collection) => {
          
          return {
            type: SearchActionTypes.LoadSearchFormSuccessAction,
            payload: collection
          };
        }),
        catchError(() => {
          return of({});
        })
      ))
  );
}
