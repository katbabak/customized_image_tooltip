import {
  Component,
  OnInit
} from '@angular/core';
import { Image } from '../../models/image';
import {
  _IMAGES,
  ImageService
} from '../../services/image.service';
import { FileService } from '../../services/base64.service';
import { BaseComponent } from '../../classes/base-component';
import {
  POSITION_X,
  POSITION_Y
} from '../../models/enums';

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
    this.imageService.getImages();
  }

}
