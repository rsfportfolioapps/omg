import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, RouterEvent, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
import { LoadApp } from './store/actions/app.action';
import { HttpLoaderService } from './services/http-loader.service';
import { Observable, of } from 'rxjs';
import { Logout } from './modules/auth/store/actions/auth.action';
import { AuthState } from './modules/auth/store/reducers/auth.reducer';
import { isLoggedInSelector } from './modules/auth/store/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showRouteTransitionLoader = false;
  public title = 'OMG';
  public loader$: Observable<boolean>;

  public events: string[] = [];
  public opened: boolean;
  public nbg: boolean;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private httpLoaderService: HttpLoaderService,
    private store: Store<AuthState>,
    private activatedRoute: ActivatedRoute
  ) {

    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));

    // this.store.dispatch(new LoadApp());
    this.loader$ = this.httpLoaderService.loader$;
  
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.nbg = params['nbg'];
    // });
  }

  public interceptRouteChangeEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showRouteTransitionLoader = true;
    }
    if (event instanceof NavigationEnd) {
      this.showRouteTransitionLoader = false;
    }
    if (event instanceof NavigationCancel) {
      this.showRouteTransitionLoader = false;
    }
    if (event instanceof NavigationError) {
      this.showRouteTransitionLoader = false;
    }
  }

  public onLogout(sidenav: any) {
    sidenav.toggle();
    this.store.dispatch(new Logout());
  }
}
