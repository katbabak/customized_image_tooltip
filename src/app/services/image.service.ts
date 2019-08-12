import { Injectable } from '@angular/core';
import { Image } from '../models/image';
import {
  BehaviorSubject,
  Observable,
  of
} from 'rxjs';
import {
  delay,
  map
} from 'rxjs/operators';

export const _IMAGES = '_IMAGES';

@Injectable()

export class ImageService {

  private imagesArray$: BehaviorSubject<Image[]> = new BehaviorSubject([]);
  imagesArrayObservable = this.imagesArray$.asObservable();
  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loadingObservable = this.loading.asObservable();

  constructor() {

  }

  setNewImage(image: Image) {
    this.loading.next(true);
    const arrayFromLS: Image[] = localStorage.getItem(_IMAGES) ? JSON.parse(localStorage.getItem(_IMAGES)) : [];
    arrayFromLS.push(image);
    localStorage.setItem(_IMAGES, JSON.stringify(arrayFromLS));
    of(arrayFromLS).pipe(delay(2000)).subscribe((array) => {
      this.loading.next(false);
      this.imagesArray$.next(array);
    });
  }

  getImages() {
    this.loading.next(true);
    const arrayFromLS: Image[] = localStorage.getItem(_IMAGES) ? JSON.parse(localStorage.getItem(_IMAGES)) : [];
    of(arrayFromLS).pipe(delay(2000)).subscribe((array) => {
      this.loading.next(false);
      this.imagesArray$.next(array);
    });
  }

  getImage(imageId: string): Observable<Image> {
    this.loading.next(true);
    const arrayFromLS: Image[] = localStorage.getItem(_IMAGES) ? JSON.parse(localStorage.getItem(_IMAGES)) : [];
    let selectedImage: Image;
    debugger;
    for (let i = 0; i < arrayFromLS.length; i++) {
      if (arrayFromLS[i].id === imageId) {
        selectedImage = arrayFromLS[i];
        break;
      }
    }
    return of(selectedImage).pipe(delay(2000), map((image) => {
      this.loading.next(false);
      return image;
    }));
  }

  addOrUpdateImage(image: Image) {
    this.loading.next(true);
    const arrayFromLS: Image[] = localStorage.getItem(_IMAGES) ? JSON.parse(localStorage.getItem(_IMAGES)) : [];
    let imageFound = false;
    for (let i = 0; i < arrayFromLS.length; i++) {
      if (arrayFromLS[i].id === image.id) {
        arrayFromLS[i] = image;
        imageFound = true;
        break;
      }
    }
    if (!imageFound) {
      arrayFromLS.push(image);
    }
    localStorage.setItem(_IMAGES, JSON.stringify(arrayFromLS));
    of(arrayFromLS).pipe(delay(2000)).subscribe((array) => {
      this.loading.next(false);
      this.imagesArray$.next(array);
    });
  }

  deleteImage(imageId: string) {
    this.loading.next(true);
    const arrayFromLS: Image[] = localStorage.getItem(_IMAGES) ? JSON.parse(localStorage.getItem(_IMAGES)) : [];
    for (let i = 0; i < arrayFromLS.length; i++) {
      if (arrayFromLS[i].id === imageId) {
        arrayFromLS.splice(i, 1);
        break;
      }
    }
    localStorage.setItem(_IMAGES, JSON.stringify(arrayFromLS));
    of(arrayFromLS).pipe(delay(2000)).subscribe((array) => {
      this.loading.next(false);
      this.imagesArray$.next(array);
    });
  }
}
