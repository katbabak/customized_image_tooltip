import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  POSITION_X,
  POSITION_Y
} from '../../models/enums';
import { OcFileStorageService } from '../../services/base64.service';
import { Image } from '../../models/image';
import { ImageService } from '../../services/image.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.scss']
})
export class NewImageComponent implements OnInit {
  newImageForm: FormGroup;
  positionXArray: string[] = [];
  positionYArray: string[] = [];
  imagePreview: {};
  @Output() popUpClosed: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private base64Service: OcFileStorageService,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.newImageForm = new FormGroup({
      newImage: new FormControl('', Validators.required),
      tooltipPosX: new FormControl('left', Validators.required),
      tooltipPosY: new FormControl('top', Validators.required),
      tooltipColor: new FormControl('#37ce3b', Validators.required),
      tooltipText: new FormControl('', Validators.required)
    });
    this.positionXArray = Object.values(POSITION_X);
    this.positionYArray = Object.values(POSITION_Y);
  }

  colorChange(color: string) {
    this.newImageForm.get('tooltipColor').setValue(color);
  }

  getImage(e) {
    this.base64Service.blobToBase64(e.target.files[0]).subscribe((base64String) => {
      console.warn(base64String);
      this.imagePreview = base64String;
    });
  }

  saveNewImage() {
    const newImage: Image = {
      imageContent: this.imagePreview.toString(),
      id: uuid.v4(),
      tooltip: {
        posX: this.newImageForm.get('tooltipPosX').value,
        posY: this.newImageForm.get('tooltipPosY').value,
        color: this.newImageForm.get('tooltipColor').value,
        text: this.newImageForm.get('tooltipText').value,
      }
    };
    this.imageService.setNewImage(newImage);
    this.popUpClosed.emit(true);
  }
}
