import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, LoginInfo, UserInfo, Registration } from '../models/auth.model';
import { map, retry, catchError, delay } from 'rxjs/operators';

@Injectable()
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public login(payload: LoginInfo): Observable<User> {
    return this.post('/api/Authentication', payload);
  }

  public register(payload: UserInfo): Observable<UserInfo> {
    return this.post('/api/Registration', payload);
  }

  public getRegistration(): Observable<Registration> {
    return this.get('/api/Registration');
  }

  public uploadImage(formData: FormData): Observable<any> {
    return this.upload('/api/File', formData);
  }

  private handleError(): any {
    return of('Error');
  }
}
