import { Component, OnInit } from '@angular/core';
import { History } from '../models/history.model';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HistoryState } from '../store/reducers/history.reducer';
import * as fromHistory from '../store/reducers/history.reducer';
import { LoadHistory, DeleteHistory } from '../store/actions/history.action';

@Component({
  selector: 'app-history-containers',
  templateUrl: './history-containers.component.html',
  styleUrls: ['./history-containers.component.scss']
})
export class HistoryContainersComponent implements OnInit {

  public history$: Observable<History>;
  public loadHistoryData = new Subject<History>();

  constructor(private store: Store<HistoryState>) {
    // initial data load
    const payload: any = {page: {min: 0, max: 100000}}; // TODO - make dynamic or lazyload
    this.store.dispatch(new LoadHistory(payload));

    this.history$ = this.store.pipe(select(fromHistory.getHistoryList));

    this.history$.subscribe((history: any) => {
      if (history.history) {
        this.loadHistoryData.next(history.history);
      }
    });
   }

  ngOnInit() {}

  public handleLoadHistoryEvent(payload: any) {
    this.store.dispatch(new LoadHistory(payload));
  }

  public handleDeleteHistoryEvent(payload: any) {
    this.store.dispatch(new DeleteHistory(payload));
  }
}
