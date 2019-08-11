import {
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogWrapperComponent } from '../pop-ups/dialog-wrapper/dialog-wrapper.component';

@Component({
  selector: 'app-add-plus-button',
  templateUrl: './add-plus-button.component.html',
  styleUrls: ['./add-plus-button.component.scss']
})

export class AddPlusButtonComponent implements OnInit{

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    console.log();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWrapperComponent, {
      width: 'auto',
      data: {}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }



}
