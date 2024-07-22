import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog($event)',
  },
})
export class LogDirective {
  private elementRef = inject(ElementRef);
  constructor() {}

  onLog() {
    console.log('Clicked on the element');
    console.log('Element:', this.elementRef.nativeElement);
  }
}
