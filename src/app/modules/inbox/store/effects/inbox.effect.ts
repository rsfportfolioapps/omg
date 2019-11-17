import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap, tap, take } from 'rxjs/operators';
import { InboxActionTypes } from '../actions/inbox.action';
import { InboxService } from '../../services/inbox.service';

export interface InboxPayloadCollection {
  sampleArrOfObjects: any[];
}

@Injectable()
export class InboxEffects {
  constructor(private actions$: Actions,
              private inboxService: InboxService) { }


  @Effect({ dispatch: true })
  public loadInbox$: Observable<any> = this.actions$.pipe(
    ofType(InboxActionTypes.LoadInboxAction),
    mergeMap((action: any) =>
    this.inboxService.loadInbox(action.payload).pipe(
      map((res) => {
        return {
          type: InboxActionTypes.LoadInboxSuccessAction,
          payload: res
        };
      }),
      catchError(() => {
        return of({});
      })
    ))
  );

  @Effect({ dispatch: false })
  public deleteInbox$: Observable<any> = this.actions$.pipe(
    ofType(InboxActionTypes.DeleteInboxAction),
    tap((action: any) => {
      this.inboxService.deleteInbox(action.payload.resourceId).subscribe();
    })
  );

}
