import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export abstract class BaseService {
  constructor(private http: HttpClient) { }

  protected getUrl(route: string = ''): string {
    return environment.apiUrl + route;
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('user')) ?
      JSON.parse(localStorage.getItem('user')).token : '';
  }

  protected commonHeaders(isUpdate: boolean = false): HttpHeaders {
    const contentType = isUpdate ? 'application/json-patch+json' : 'application/json';
    return new HttpHeaders({
      'Content-Type': contentType,
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  protected get(route: string): Observable<any> {
    const url = this.getUrl() + route;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: 'application/json'
    });
    const options = { headers: headers };
    return this.http.get(url, options);
  }

  getImage(imageUrl: string): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      responseType: 'blob'
    });
    const options = { headers: headers};

    return this.http.get(imageUrl, options);
  }

  protected post(route: string, object?: any): Observable<any> {
    return this.http.post(this.getUrl(route), object, { headers: this.commonHeaders() });
  }

  protected delete(route: string): Observable<any> {
    return this.http.delete(this.getUrl(route), {
      headers: this.commonHeaders()
    });
  }

  protected upload(route: string, object: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: 'application/json'
    });
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post(this.getUrl(route), object, { headers: headers });
  }

  protected put(route: string, object: any): Observable<any> {
    return this.http.put(this.getUrl(route), object, { headers: this.commonHeaders(true) });
  }

  protected patch(route: string, object: any): Observable<any> {
    return this.http.patch(this.getUrl(route), object, { headers: this.commonHeaders(true) }
    );
  }
}
