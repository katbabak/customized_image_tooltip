import {
  Component,
  OnInit
} from '@angular/core';
import {
  ImageService
} from '../../services/image.service';
import { BaseComponent } from '../../classes/base-component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent extends BaseComponent implements OnInit {

  constructor(readonly imageService: ImageService) {
    super();
  }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.imageService.getImages()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }

}
