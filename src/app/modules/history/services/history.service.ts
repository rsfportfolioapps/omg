import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { History } from '../models/history.model';

@Injectable()
export class HistoryService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public loadHistory(payload: any): Observable<History> {
    return this.post('/api/ResourceTable/history', payload);
  }

  public downloadImage(imageUrl: string): Observable<Blob> {
    return this.getImage(imageUrl);
  }

  public deleteHistory(resourceId: number): Observable<any> {
    return this.delete(`/api/ResourceTable/${resourceId}`);
  } 

}

