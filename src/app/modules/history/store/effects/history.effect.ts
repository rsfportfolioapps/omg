import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap, tap, take } from 'rxjs/operators';
import { HistoryActionTypes } from '../actions/history.action';
import { HistoryService } from '../../services/history.service';

export interface HistoryPayloadCollection {
  sampleArrOfObjects: any[];
}

@Injectable()
export class HistoryEffects {
  constructor(private actions$: Actions,
              private historyService: HistoryService) { }

  
  @Effect({ dispatch: true })
  public loadHistory$: Observable<any> = this.actions$.pipe(
    ofType(HistoryActionTypes.LoadHistoryAction),
    mergeMap((action: any) =>
    this.historyService.loadHistory(action.payload).pipe(
      map((res) => {
        return {
          type: HistoryActionTypes.LoadHistorySuccessAction,
          payload: res
        };
      }),
      catchError(() => {
        return of({});
      })
    ))
  );

  @Effect({ dispatch: false })
  public deleteHistory$: Observable<any> = this.actions$.pipe(
    ofType(HistoryActionTypes.DeleteHistoryAction),
    tap((action: any) => {
      this.historyService.deleteHistory(action.payload.resourceId).subscribe();
    })
  );

}
