import { NgModule } from '@angular/core';
import { KatTooltipDirective } from './kat-tooltip';
import { CommonModule } from '@angular/common';
import { KatTooltipContentComponent } from './kat-tooltip-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KatTooltipDirective,
    KatTooltipContentComponent
  ],
  exports: [
    KatTooltipDirective,
    KatTooltipContentComponent
  ],
  entryComponents: [
    KatTooltipContentComponent
  ]
})

export class KatTooltipModule {

}
