import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import type { Tooltip } from 'bootstrap';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('appTooltip') tooltipTitle: string = '';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipInstance?: Tooltip;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.tooltipInstance =  new window.bootstrap.Tooltip(this.elementRef.nativeElement, {
      title: this.tooltipTitle,
      placement: this.placement,
      trigger: 'hover'
    });
  }

  ngOnDestroy(): void {
    this.tooltipInstance?.dispose();
  }
}