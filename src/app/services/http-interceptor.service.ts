import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { HttpLoaderService } from './http-loader.service';
import { AuthState } from '../modules/auth/store/reducers/auth.reducer';
import { Logout } from '../modules/auth/store/actions/auth.action';
import { Store } from '@ngrx/store';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private httpLoaderService: HttpLoaderService,
    private store: Store<AuthState>
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpLoaderService.show(true);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        // if (error.statusText === 'Unauthorized' || error.status === 401) {
        //   this.store.dispatch(new Logout());
        // }

        return throwError(error);
      }),
      finalize(() => {
        this.httpLoaderService.show(false);
      }));
  }
}
