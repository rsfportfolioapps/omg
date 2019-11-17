import { Component, OnInit } from '@angular/core';
import { Inbox } from '../models/inbox.model';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { InboxState } from '../store/reducers/inbox.reducer';
import * as fromInbox from '../store/reducers/inbox.reducer';
import { LoadInbox, DeleteInbox } from '../store/actions/inbox.action';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchState } from '../../search/store/reducers/search.reducer';
import * as fromSearch from '../../search/store/reducers/search.reducer';
import { map } from 'rxjs/internal/operators';
import { LoadSearch } from '../../search/store/actions/search.action';

@Component({
  selector: 'app-inbox-containers',
  templateUrl: './inbox-containers.component.html',
  styleUrls: ['./inbox-containers.component.scss']
})
export class InboxContainersComponent implements OnInit {
  public isSearch = false;
  public inbox$: Observable<Inbox>;
  public loadInboxData = new Subject<Inbox>();

  private state$: Observable<object>;

  constructor(
    private store: Store<InboxState>,
    private searchStore: Store<SearchState>,
    private route: ActivatedRoute, private router: Router) {
    // initial data load
    const payload: any = {page: {min: 0, max: 100000}}; // TODO - make dynamic or lazyload

    this.route.queryParams.subscribe(params => {
      this.isSearch = !!params['is_search'] || false;
      if (this.isSearch) {
        this.state$ = this.route.paramMap
          .pipe(map(() => window.history.state));
        this.state$.subscribe((p: any) => {
          if (p) {
            this.store.dispatch(new LoadSearch(p));
          }
        });

        this.inbox$ = this.searchStore.pipe(select(fromSearch.getSearch));

        this.inbox$.subscribe((search: any) => {
          if (search && search.search) {
            this.loadInboxData.next(search.search);
          }
        });
      } else {
        this.store.dispatch(new LoadInbox(payload));

        this.inbox$ = this.store.pipe(select(fromInbox.getInboxList));

        this.inbox$.subscribe((inbox: any) => {
          if (inbox.inbox) {
            this.loadInboxData.next(inbox.inbox);
          }
        });
      }
    });
   }

  ngOnInit() {}

  public handleLoadInboxEvent(payload: any) {
    this.store.dispatch(new LoadInbox(payload));
  }

  public handleDeleteInboxEvent(payload: any) {
    this.store.dispatch(new DeleteInbox(payload));
  }
}
