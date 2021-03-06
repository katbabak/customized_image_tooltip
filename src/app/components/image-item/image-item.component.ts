import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Image } from '../../models/image';
import { DialogWrapperComponent } from '../pop-ups/dialog-wrapper/dialog-wrapper.component';
import { MatDialog } from '@angular/material';
import { DIALOG_STATES } from '../../models/enums';
import { ImageService } from '../../services/image.service';
import { BaseComponent } from '../../classes/base-component';
import {
  takeUntil
} from 'rxjs/operators';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent extends BaseComponent implements OnInit {
  @Input() image: Image;

  constructor(private dialog: MatDialog,
              public imageService: ImageService) {
    super();
  }

  ngOnInit() {
  }

  openDetails() {
    const dialogRef = this.dialog.open(DialogWrapperComponent, {
      width: 'auto',
      data: {
        state: DIALOG_STATES.DETAILS,
        imageData: this.image
      }
    });
  }

  deleteImage() {
    this.imageService.deleteImage(this.image.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }
}
