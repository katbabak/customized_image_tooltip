import { NgModule } from '@angular/core';
import {
  MatButtonModule,
} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  imports: [
    MATERIAL_MODULES
  ],
  exports: [
    MATERIAL_MODULES
  ]
})

export class MaterialModule {

}
