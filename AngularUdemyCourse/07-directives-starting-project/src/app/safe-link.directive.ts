import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { LogDirective } from './log.directive';

// NOTE: CUSTOM ATTRIBUTE DIRECTIVE

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective');
  }

  // allowing input and output to custom directives
  queryParam = input('myapp', { alias: 'appSafeLink' }); // allowing input and output to custom directives

  onConfirmLeavePage(event: MouseEvent) {
    // Add your implementation here
    const wantsToLeave = confirm(
      'Are you sure you want to open the external A link?'
    );

    if (wantsToLeave) {
      //   const address = event.target as HTMLAnchorElement;
      //   console.log('User wants to open the link:', address.href);
      //   address.href = address + '?from=' + this.queryParam();

      this.hostElementRef.nativeElement.href =
        this.hostElementRef.nativeElement.href + '?from=' + this.queryParam();
      return;
    }
    // cancel navigation with the a tag
    if (!wantsToLeave) {
      event.preventDefault();
    }
  }
}
