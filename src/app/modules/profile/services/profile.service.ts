import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInfo } from '../../auth/models/auth.model';

@Injectable()
export class ProfileService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getProfile(): Observable<UserInfo> {
    return this.get('/api/Profile/form');
  }

  public updateProfile(payload: any): Observable<any> {
    return this.put('/api/Profile/form', payload);
  }

  private handleError(): any {
    return of('Error');
  }
}
