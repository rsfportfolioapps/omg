import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UploadData } from '../models/upload.model';

@Injectable()
export class UploadService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public deleteTag(id: number): Observable<any> {
    return this.delete('/api/tag?tagId=' + id);
  }

  public getUploadForm(): Observable<UploadData> {
    return this.get('/api/UploadForm');
  }

  public fetchUploadInfo(resourceId: number): Observable<any> {
    return this.get(`/api/UploadForm/${resourceId}`);
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

  public uploadSave(payload: any): Observable<any> {
    return this.post('/api/UploadForm', payload);
  }

  public uploadSendToQA(payload: any): Observable<any> {
    return this.post('/api/UploadForm/sendToQa', payload);
  }
}

