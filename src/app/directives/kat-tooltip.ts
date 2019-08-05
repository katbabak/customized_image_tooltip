import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { KatTooltipContentComponent } from './kat-tooltip-content.component';

@Directive({
  selector: '[katTooltip]'
})
export class KatTooltipDirective implements OnChanges, OnDestroy {

  timeouts = [];
  @Input() katTooltip: string;
  @Input() katTooltipPositionX: 'left' | 'center' | 'right';
  @Input() katTooltipPositionY: 'top' | 'bottom';
  @Input() katTooltipColour;

  private defaultColour = '#343434';
  private tooltip: ComponentRef<KatTooltipContentComponent>;

  constructor(private viewContainerRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  @HostListener('mouseenter', ['$event'])
  @HostListener('focusin', ['$event'])
  handleIn(event: Event): void {
    this.clearTimeouts();
    this.timeouts.push(setTimeout(() => this.show(), 500));
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('focusout', ['$event'])
  handleOut(event: Event): void {
    this.clearTimeouts();
    this.timeouts.push(setTimeout(() => this.hide(), 50));
  }

  show(): void {
    if (this.katTooltip) {
      if (!this.tooltip) {
        const inputs: { [key: string]: any } = {
          hostElement: this.viewContainerRef.element.nativeElement,
          content: this.katTooltip,
          posX: this.katTooltipPositionX,
          posY: this.katTooltipPositionY,
          colour: this.katTooltipColour ? this.katTooltipColour : this.defaultColour,
          showFunctionForContent: (event: Event) => this.showFunctionForContent(event),
          hideFunctionForContent: (event: Event) => this.hideFunctionForContent(event),
        };
        const factory = this.resolver.resolveComponentFactory(KatTooltipContentComponent);
        let viewContainerRef: ViewContainerRef = null;
        viewContainerRef = this.viewContainerRef;

        this.tooltip = factory.create(viewContainerRef.injector);
        Object.keys(inputs).map((key) => this.tooltip.instance[key] = inputs[key]);
        viewContainerRef.insert(this.tooltip.hostView);
      }
    }
  }


  hide(): void {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
    this.clearTimeouts();
  }

  showFunctionForContent(event: Event) {
    this.handleIn(event);
  }

  hideFunctionForContent(event: Event) {
    this.handleOut(event);
  }


  clearTimeouts() {
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
    this.timeouts = [];
  }

  ngOnDestroy() {
    this.clearTimeouts();
    this.hide();
  }
}
