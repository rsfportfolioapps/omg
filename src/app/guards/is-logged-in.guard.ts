import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../modules/auth/store/reducers/auth.reducer';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { isLoggedInSelector } from '../modules/auth/store/selectors/auth.selector';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  public isLoggedIn$: Observable<boolean>;

  constructor (private router: Router, private store: Store<AuthState>) {
  }

  canActivate (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.pipe(
      select(isLoggedInSelector),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          console.log('redirecting to login page', isLoggedIn);
          this.router.navigateByUrl('login');
        } else {
          return true;
        }
      })
    );
  }
}
