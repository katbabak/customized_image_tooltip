import {
  Component,
  OnInit
} from '@angular/core';
import { Image } from '../../models/image';
import {
  _IMAGES,
  ImageService
} from '../../services/image.service';
import { OcFileStorageService } from '../../services/base64.service';
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

  base64textString: string;
  url: string;
  quokkaData: string;

  constructor(readonly imageService: ImageService,
              private readonly ocFileStorageSvc: OcFileStorageService) {
    super();
  }

  ngOnInit() {
    // localStorage.removeItem(_IMAGES);
    // this.url = 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
    // this.ocFileStorageSvc
    //   .getStoredFile('quokka', this.url)
    //   .subscribe((base64Data: string) => {
    //     this.quokkaData = base64Data;
    //   });
    this.getImages();
  }

  getImages() {
    this.imageService.getImages();
  }

}
