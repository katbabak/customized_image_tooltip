import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

@Component({
  selector: 'app-dialog-wrapper',
  templateUrl: 'dialog-wrapper.component.html',
})
export class DialogWrapperComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
