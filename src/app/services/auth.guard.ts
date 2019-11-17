import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/reducers/app.reducer';
import { tap } from 'rxjs/operators';
import { isLoggedInSelector } from '../modules/auth/store/selectors/auth.selector';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(isLoggedInSelector),
      tap(isLoggedIn => {
        
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
