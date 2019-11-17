import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../modules/auth/store/reducers/auth.reducer';
import { tap } from 'rxjs/operators';
import { isLoggedInSelector } from '../modules/auth/store/selectors/auth.selector';

@Injectable()
export class IsAlreadyLoggedInGuard implements CanActivate {
  public isLoggedIn: boolean;

  constructor (private router: Router, private store: Store<AuthState>) {

  }

  canActivate (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.pipe(
      select(isLoggedInSelector),
      tap(isLoggedIn => {
        
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login');
          return true;
        }
      })
    );
  }
}
