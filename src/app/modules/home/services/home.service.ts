import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UploadFormCollection } from '../models/home.model';

@Injectable()
export class HomeService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getUploadForm(): Observable<UploadFormCollection> {
    return this.get('/api/UploadForm');
  }

  public addNewTag(newTag: string): Observable<any> {
    return this.post(`/api/Tag?label=${newTag}`, newTag);
  }

  public uploadMainFile(formData: FormData): Observable<any> {
    return this.upload('/api/File', formData);
  }

  public uploadSources(formData: FormData): Observable<any> {
    return this.upload('/api/File/multiple', formData);
  }

  public uploadForm(payload: any): Observable<any> {
    return this.post('/api/UploadForm', payload);
  }
}

