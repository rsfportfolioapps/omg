import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inbox } from '../models/inbox.model';

@Injectable()
export class InboxService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public loadInbox(payload: any): Observable<Inbox> {
    return this.post('/api/ResourceTable/inbox', payload);
  }

  public downloadImage(imageUrl: string): Observable<Blob> {
    return this.getImage(imageUrl);
  }

  public deleteInbox(resourceId: number): Observable<any> {
    return this.delete(`/api/ResourceTable/${resourceId}`);
  }

}

