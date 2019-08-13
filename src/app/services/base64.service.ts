import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  blobToBase64(blob: Blob): Observable<{}> {
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
}
