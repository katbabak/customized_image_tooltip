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
import {
  ActivatedRoute,
  Router
} from '@angular/router';

@Component({
  selector: 'app-add-or-update-image',
  templateUrl: './add-or-update-image.component.html',
  styleUrls: ['./add-or-update-image.component.scss']
})
export class AddOrUpdateImageComponent implements OnInit {
  imageForm: FormGroup = null;
  positionXArray: string[] = [];
  positionYArray: string[] = [];
  editMode = false;
  imagePreview: {} = null;
  @Output() popUpClosed: EventEmitter<boolean> = new EventEmitter(false);
  private image: Image = null;

  constructor(private base64Service: OcFileStorageService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.positionXArray = Object.values(POSITION_X);
    this.positionYArray = Object.values(POSITION_Y);
    this.getImage();
  }

  private getImage() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.imageService.getImage(id.toString()).subscribe((image) => {
        this.image = image;
        this.editMode = true;
        this.imagePreview = this.image.imageContent;
        this.initForm();
      });
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.imageForm = new FormGroup({
      tooltipPosX: new FormControl(this.editMode ? this.image.tooltip.posX : 'left', Validators.required),
      tooltipPosY: new FormControl(this.editMode ? this.image.tooltip.posY : 'top', Validators.required),
      tooltipColor: new FormControl(this.editMode ? this.image.tooltip.color : '#37ce3b', Validators.required),
      tooltipText: new FormControl(this.editMode ? this.image.tooltip.text : '', Validators.required)
    });
  }

  colorChange(color: string) {
    this.imageForm.get('tooltipColor').markAsDirty();
    this.imageForm.get('tooltipColor').setValue(color);
  }

  getImageBase64(e) {
    const doesExist = e.target.files.length > 0;
    if (doesExist) {
      this.base64Service.blobToBase64(e.target.files[0]).subscribe((base64String) => {
        this.imagePreview = base64String;
      });
    }
  }

  addOrUpdateImage() {
    const newImage: Image = {
      imageContent: this.imagePreview.toString(),
      id: this.editMode ? this.image.id : uuid.v4(),
      tooltip: {
        posX: this.imageForm.get('tooltipPosX').value,
        posY: this.imageForm.get('tooltipPosY').value,
        color: this.imageForm.get('tooltipColor').value,
        text: this.imageForm.get('tooltipText').value,
      }
    };
    this.imageService.addOrUpdateImage(newImage);
    this.popUpClosed.emit(true);
    this.router.navigateByUrl('/');
  }
}
