import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public convertBlobToBase64(blob: Blob): Observable<{}> {
    const fileReader = new FileReader();
    const observable = new Observable(observer => {
      fileReader.onloadend = () => {
        observer.next(fileReader.result);
        observer.complete();
      };
    });
    fileReader.readAsDataURL(blob);
    return observable;
  }

  public convertBase64DatatoBlob(dataURI: any) {
    let byteString: any;
    let mimeString: any;
    let ia: any;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
    mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

}

