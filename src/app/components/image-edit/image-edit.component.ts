import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})

export class ImageEditComponent implements OnInit {
  image: Image;

  constructor(private route: ActivatedRoute,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.getImage();
  }

  private getImage() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.imageService.getImage(id.toString()).subscribe((image) => this.image = image);
    this.initForm();
  }

  private initForm() {

  }
}
