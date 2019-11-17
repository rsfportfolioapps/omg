import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchState } from '../../store/reducers/search.reducer';
import { searchFormCollectionSelector } from '../../store/selectors/search.selector';
import { LoadSearchForm } from '../../store/actions/search.action';
import { SearchFormCollection } from '../../models/search.model';
import { Router } from '@angular/router';
import {Tags } from 'src/app/modules/upload/models/upload.model';
import { UploadForm } from 'src/app/modules/home/store/actions/home.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public defaultDate = new Date();
  public searchType: 'OwnPortfolio' | 'EntireDatabase' = 'OwnPortfolio';
  public name = null;
  public languages = [];
  public tags = [];
  public statuses = [];
  public assignedTo = [];
  public category = [];
  public selectedTagItems: Tags[] = [];

  public searchForm$: Observable<SearchFormCollection>;
  public uploadForm$: Observable<UploadForm>;

  private dateFrom = null;
  private dateTo = null;
  private selectedTagIds: number[] = [];

  constructor(private store: Store<SearchState>, private router: Router) {
    this.searchForm$ = this.store.pipe(select(searchFormCollectionSelector));
    this.store.dispatch(new LoadSearchForm());
  }

  @ViewChild('inputDateRange', { static: false }) inputDateRange: ElementRef;

  ngOnInit() {
  }

  public onSearch(): void {
    const payload = {
      'filter': {
        'searchType': this.searchType,
        'dateFrom': this.dateFrom,
        'dateTo': this.dateTo,
        'name': this.name,
        'languages': this.languages,
        'tags': this.selectedTagIds,
        'statuses': this.statuses,
        'assignedTo': this.assignedTo,
        'categories': this.category
      },
      'page': {
        'min': 0,
        'max': 100
      }
    };

    this.router.navigate(['/inbox'], { queryParams: { is_search: true }, state: payload });
  }


  public onSelectTagChange(event: any): void {
    this.selectedTagItems = event.value;
    this.selectedTagIds = [];

    this.selectedTagItems.forEach(tag => {
      this.selectedTagIds.push(tag.key);
    });
  }

  public handleSelectChange(ev: any, prop) {
    this[prop] = [ev.value.key];
  }

  public onDateChange(event: any): void {
    if (event.startDate) {
      this.dateFrom = event.startDate._d;
      this.dateTo = event.endDate._d;
    }
  }
}
