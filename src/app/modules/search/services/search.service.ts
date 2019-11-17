import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {SearchFormCollection} from '../models/search.model';

@Injectable()
export class SearchService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getSearchForm(): Observable<SearchFormCollection> {
    return this.get('/api/SearchForm');
  }

  public getSearch(payload: any): Observable<any> {
    return this.post('/api/SearchForm', payload);
  }

  private handleError(): any {
    return of('Error');
  }
}

