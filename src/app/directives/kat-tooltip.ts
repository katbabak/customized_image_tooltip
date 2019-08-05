import {
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
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
  private _visible = false;
  private tooltip: ComponentRef<KatTooltipContentComponent>;

  constructor(private viewContainerRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
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
    console.log('__------SHOW!!!!');
    console.log(this.katTooltip);
    if (this.katTooltip) {
      this.visible = true;
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
        //
        //     if (this.toRoot) {
        //       const root = this.applicationRef.components[0].instance;
        //       viewContainerRef = 'viewContainerRef' in root ? root.viewContainerRef : this.viewContainerRef;
        //     } else {
        viewContainerRef = this.viewContainerRef;
        // }

        this.tooltip = factory.create(viewContainerRef.injector);
        Object.keys(inputs).map((key) => this.tooltip.instance[key] = inputs[key]);
        viewContainerRef.insert(this.tooltip.hostView);
      }
    }
  }


  hide(): void {
    console.log('HIDE!!!');
    // this.visible = false;
    // if (this.tooltip) {
    //   this.tooltip.destroy();
    //   this.tooltip = null;
    // }
    // this.clearTimeouts();
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
