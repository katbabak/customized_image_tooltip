import {
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogWrapperComponent } from '../pop-ups/dialog-wrapper/dialog-wrapper.component';
import { DIALOG_STATES } from '../../models/enums';

@Component({
  selector: 'app-add-plus-button',
  templateUrl: './add-plus-button.component.html',
  styleUrls: ['./add-plus-button.component.scss']
})

export class AddPlusButtonComponent implements OnInit{

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWrapperComponent, {
      width: 'auto',
      data: {
        state: DIALOG_STATES.CREATE
      }
    });
  }



}
