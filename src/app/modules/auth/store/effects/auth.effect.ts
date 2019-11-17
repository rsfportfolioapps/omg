import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable, defer } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  Logout,
  Register,
  RegisterSuccess
} from '../actions/auth.action';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';

export interface LoginPayloadCollection {
  sampleArrOfObjects: any[];
}

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService,
    private route: Router,
    private store: Store<AuthState>,
    private actions$: Actions) { }

  @Effect({ dispatch: true })
  public loadRegister$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoadRegisterAction),
    mergeMap((action: any) =>
      this.authService.getRegistration().pipe(
        map((collection) => {
          return {
            type: AuthActionTypes.LoadRegisterSuccessAction,
            payload: collection
          };
        }),
        catchError(() => {
          return of({});
        })
      ))
  );

  @Effect({ dispatch: true })
  public register$ = this.actions$.pipe(
    ofType(AuthActionTypes.RegisterAction),
    mergeMap((action: Register) => this.authService.register(action.payload).pipe(
      map((res) => {
        return {
          type: AuthActionTypes.RegisterSuccessAction,
          payload: res
        };
      }),
      catchError(() => {
        return of({});
      })
    ))
  );

  @Effect()
  public login$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginAction),
    mergeMap((action: Login) => this.authService.login(action.payload).pipe(
      map((user: User) => {
        return {
          type: AuthActionTypes.LoginSuccessAction,
          payload: user
        }
      }),
      catchError(() => {
        return of({});
      })
    ))
  );

  @Effect({ dispatch: false })
  public loginSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccessAction),
    tap((action: any) => {
      localStorage.setItem('user', JSON.stringify(action.payload));

      this.route.navigateByUrl('/upload');
    }),
    catchError(() => {
      return of({});
    })
  );

  @Effect({ dispatch: false })
  public logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutAction),
    tap((res: any) => {
      localStorage.clear();

      this.route.navigateByUrl('login');
    }),
    catchError(() => {
      //display error here
      return of({});
    })

  );
}
