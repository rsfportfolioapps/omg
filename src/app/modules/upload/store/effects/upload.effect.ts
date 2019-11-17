import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, zip, Observable, forkJoin } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UploadActionTypes, UploadActions, UploadSave, UploadSendToQa, LoadUploadForm } from '../actions/upload.action';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { UploadInfo, UploadData, Tags } from '../../models/upload.model';
import { Store } from '@ngrx/store';
import { UploadState } from '../reducers/upload.reducer';

export interface HomePayloadCollection {
  sampleArrOfObjects: any[];
}

@Injectable()
export class UploadEffects {
  constructor(private store: Store<UploadState>, private actions$: Actions, private route: Router, private uploadService: UploadService) { }

  @Effect({ dispatch: true })
  public uploadDetails$ = this.actions$.pipe(
    ofType(UploadActionTypes.loadUploadDetails),
    mergeMap((action: any) =>
      this.uploadService.fetchUploadInfo(action.payload).pipe(
        map((details) => {
          return {
            type: UploadActionTypes.loadUploadDetailsSuccess,
            payload: details
          }
        }),
        catchError(() => of({}))
      ))
  )

  @Effect({ dispatch: false })
  public addNewTag$ = this.actions$.pipe(
    ofType(UploadActionTypes.AddTagAction),
    mergeMap((action: any) =>
      this.uploadService.addNewTag(action.payload).pipe(
        tap(() => {
          this.store.dispatch(new LoadUploadForm())
        }),
        catchError(() => of({}))
      ))
  )

  @Effect({ dispatch: false })
  public upload$ = this.actions$.pipe(
    ofType(UploadActionTypes.UploadFile),
    tap(action => {
      localStorage.setItem('uploadedFile', JSON.stringify(action['payload']));
      this.route.navigateByUrl('/upload/upload-detail-new');
    })
  );

  @Effect({ dispatch: true })
  public uploadForm$: Observable<any> = this.actions$.pipe(
    ofType(UploadActionTypes.LoadUploadFormAction),
    mergeMap((action: UploadData) =>
      this.uploadService.getUploadForm().pipe(
        map((collection) => {
          return {
            type: UploadActionTypes.LoadUploadFormSuccessAction,
            payload: collection
          };
        }),
        catchError(() => {
          return of({});
        })
      ))
  );

  @Effect({ dispatch: true })
  public uploadSave$ = this.actions$.pipe(
    ofType(UploadActionTypes.UploadSaveAction),
    mergeMap((action: UploadSave) =>
      this.uploadService.uploadSave(action.payload).pipe(
        map((response: Tags) => {
          return {
            type: UploadActionTypes.UploadSaveSuccessAction,
            payload: response
          };
        }),
        catchError(() => of({}))
      ))
  );

  @Effect({ dispatch: true })
  public uploadSendToQa$ = this.actions$.pipe(
    ofType(UploadActionTypes.UploadSendToQaAction),
    mergeMap((action: UploadSendToQa) =>
      this.uploadService.uploadSendToQA(action.payload).pipe(
        map((response: Tags) => {
          return {
            type: UploadActionTypes.UploadSaveSuccessAction,
            payload: response
          };
        }),
        catchError(() => {
          return of({});
        })
      ))
  );

  private formatResponse(
    sampleArrOfObjects?: any[]): HomePayloadCollection {
    return {
      sampleArrOfObjects
    };
  }

}
