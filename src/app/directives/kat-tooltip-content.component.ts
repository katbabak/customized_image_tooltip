import {
  Component,
  Input,
  AfterContentInit
} from '@angular/core';

interface Position {
  top: number | string;
  right: number | string;
  // bottom: number|string;
  left: number | string;
}

@Component({
  selector: 'kat-tooltip-content',
  templateUrl: './kat-tooltip-content.html',
  styleUrls: ['./kat-tooltip-content.scss']
})

export class KatTooltipContentComponent implements AfterContentInit {
  @Input() hostElement: HTMLElement;
  @Input() content: string;
  @Input() posX: string;
  @Input() posY: string;
  @Input() colour: string;
  @Input() showFunctionForContent: (event: Event) => void;
  @Input() hideFunctionForContent: (event: Event) => void;

  position: Position = {top: 'auto', right: 'auto', /*bottom: 'auto',*/ left: 'auto'};
  finalY: string;
  initHide = true;


  overContent(event: Event) {
    this.showFunctionForContent(event);
  }

  outContent(event: Event) {
    this.hideFunctionForContent(event);
  }

  ngAfterContentInit(): void {
    setTimeout(() => this.setPosition());
    this.finalY = this.posY;
  }

  setPosition() {
    const p = this.computePosition(this.hostElement);
    this.position.top = p.top;
    this.position.right = p.right;
    this.position.left = p.left;
    this.initHide = false;
  }


  private computePosition(el: HTMLElement): Position {
    let top: number | string = '0px';
    let right: number | string = 'auto';
    let left: number | string = 'auto';

    const rect = el.getBoundingClientRect();
    if (!this.posX) {
      if (window.innerWidth / 3 > rect.left) {
        this.posX = 'left';
      } else if ((window.innerWidth / 3 < rect.left) && (window.innerWidth / 3 * 2 > rect.left)) {
        this.posX = 'center';
      } else if ((window.innerWidth / 3 * 2 < rect.left) && (window.innerWidth > rect.left)) {
        this.posX = 'right';
      }
    }
    switch (this.posX) {
      case 'left':
        left = rect.left + 'px';
        break;
      case 'center':
        left = rect.left + (rect.width / 2) + 'px';
        break;
      case 'right':
        right = window.innerWidth - (rect.left + (rect.width)) + 'px';
        break;
      default:
        break;
    }

    if (this.posY !== 'top' && this.posY !== 'bottom') {
      if (rect.top - rect.height > 10) {
        this.finalY = 'top';
      } else {
        this.finalY = 'bottom';
      }
    }
    switch (this.finalY) {
      case 'top':
        top = rect.top - 2 + 'px';
        break;
      case 'bottom':
        top = rect.top + rect.height + 2 + 'px';
        break;
      default:
        break;
    }

    return {
      top,
      right,
      // bottom: bottom,
      left,
    };
  }

}
