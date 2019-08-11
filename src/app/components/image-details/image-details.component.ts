import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})

export class ImageDetailsComponent implements OnInit {

  @Input() image: Image;

  constructor() {

  }

  ngOnInit(): void {
  }

}
