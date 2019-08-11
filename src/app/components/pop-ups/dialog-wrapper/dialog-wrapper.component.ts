import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { DIALOG_STATES } from '../../../models/enums';


interface IDialogData {
  state: string;
  imageData?: any;
}

@Component({
  selector: 'app-dialog-wrapper',
  templateUrl: 'dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss'],
})


export class DialogWrapperComponent {
  dialogStates = DIALOG_STATES;

  constructor(
    public dialogRef: MatDialogRef<DialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
  }


  close(): void {
    this.dialogRef.close();
  }

  getPopUpState($event: boolean) {
    if ($event) {
      this.close();
    }
  }
}
