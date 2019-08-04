import { Injectable } from '@angular/core';
import { Image } from '../models/image';
import {
  BehaviorSubject,
  of
} from 'rxjs';
import { delay } from 'rxjs/operators';

export const _IMAGES = '_IMAGES';

@Injectable()

export class ImageService {

  private imagesArray$: BehaviorSubject<Image[]> = new BehaviorSubject([]);
  imagesArrayObservable = this.imagesArray$.asObservable();

  constructor() {

  }

  setNewImage(image: Image) {
    console.warn(localStorage.getItem(_IMAGES));
    const arrayFromLS: Image[] = localStorage.getItem(_IMAGES) ? JSON.parse(localStorage.getItem(_IMAGES)) : [];
    arrayFromLS.push(image);
    localStorage.setItem(_IMAGES, JSON.stringify(arrayFromLS));
    of(arrayFromLS).pipe(delay(2000)).subscribe((array) => {
      this.imagesArray$.next(array);
    });
  }

  getImages() {
    const arrayFromLS: Image[] = localStorage.getItem(_IMAGES) ? JSON.parse(localStorage.getItem(_IMAGES)) : [];
    of(arrayFromLS).pipe(delay(2000)).subscribe((array) => {
      this.imagesArray$.next(array);
    });
  }

  updateImage(image: Image) {

  }

  deleteImage() {

  }
}
