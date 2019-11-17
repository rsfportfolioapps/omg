import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, zip, Observable } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HomeActionTypes, HomeActions, UploadForm } from '../actions/home.action';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { UploadInfo, UploadFormCollection, Tags } from '../../models/home.model';

export interface HomePayloadCollection {
  sampleArrOfObjects: any[];
}

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions,
              private route: Router,
              private homeService: HomeService) { }

  @Effect()
  public loadHome$: Observable<any> = this.actions$.pipe(
    ofType(HomeActionTypes.LoadHome),
    mergeMap((action: HomeActions) => zip(
      of([{}])
    ).pipe(
      map(([sampleArr]) => {
        return {
          type: HomeActionTypes.LoadHomeSuccess,
          payload: this.formatResponse(sampleArr)
        };
      }),
      catchError(() => {
        return of({});
      })
    ))
  );

  @Effect({ dispatch: false })
  public upload$ = this.actions$.pipe(
    ofType(HomeActionTypes.UploadFile),
    tap(action => {
      localStorage.setItem('uploadedFile', JSON.stringify(action['payload']));
      // this.route.navigateByUrl('home/upload-detail-new?nbg=true');
    })
  );

  @Effect({ dispatch: true })
  public loadUploadForm$: Observable<any> = this.actions$.pipe(
    ofType(HomeActionTypes.LoadUploadFormAction),
    mergeMap((action: UploadFormCollection) =>
      this.homeService.getUploadForm().pipe(
        map((collection) => {
          return {
            type: HomeActionTypes.LoadUploadFormSuccessAction,
            payload: collection
          };
        }),
        catchError(() => {
          return of({});
        })
      ))
  );

  @Effect({ dispatch: true })
  public addNewTag$ = this.actions$.pipe(
    ofType(HomeActionTypes.AddTagAction),
    mergeMap((action: any) =>
      this.homeService.addNewTag(action.newTag).pipe(
        map((resTag: Tags ) => {
          return {
            type: HomeActionTypes.AddTagSuccessAction,
            payload: resTag
          };
        }),
        catchError(() => {
          return of({});
        })
      ))
  );

  @Effect({ dispatch: true })
  public uploadForm$ = this.actions$.pipe(
    ofType(HomeActionTypes.UploadFormAction),
    mergeMap((action: UploadForm) =>
      this.homeService.uploadForm(action.payload).pipe(
        map((response: Tags ) => {
          return {
            type: HomeActionTypes.UploadFormSuccessAction,
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
