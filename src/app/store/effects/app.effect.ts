import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, zip, Observable, defer } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppActionTypes, AppActions, IsLoggin } from '../actions/app.action';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';
import { LoginSuccess } from 'src/app/modules/auth/store/actions/auth.action';

export interface AppPayloadCollection {
  sampleArrOfObjects: any;
}

@Injectable()
export class AppEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) { }

  @Effect()
  init$ = defer(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user !== 'undefined') {
      this.store.dispatch(new LoginSuccess(user));
    } else {
      // logout
    }
  });

  // @Effect()
  // public loadApp$: Observable<any> = this.actions$.pipe(
  //   ofType(AppActionTypes.LoadApp),
  //   mergeMap((action: AppActions) => of([1, 2, 3]).pipe(
  //     map(([sampleArr]) => {
  //       
  //       return {
  //         type: AppActionTypes.LoadAppSuccess,
  //         payload: this.formatResponse(sampleArr)
  //       };
  //     }),
  //     catchError(() => {
  //       return of({});
  //     })
  //   ))
  // );

  // private formatResponse(
  //   sampleArrOfObjects?: any): AppPayloadCollection {
  //   return {
  //     sampleArrOfObjects
  //   };
  // }
}
