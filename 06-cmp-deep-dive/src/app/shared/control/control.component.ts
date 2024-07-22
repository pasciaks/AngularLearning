import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  Input,
  ViewEncapsulation,
} from '@angular/core';
@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  // below disables encapsulation
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  // @Input() label: string;
  label = input.required<string>();

  private el = inject(ElementRef); // access to the host element

  // below works instead of host binding but is not recommended
  // @HostBinding('class') className = 'control';

  ngAfterContentInit(): void {
    // AfterContentInit is the earliest lifecycle hook where
    // content child values are available here
  }

  constructor() {
    afterRender(() => {
      //console.log('anytime anything is rendered APP WIDE');
    });

    afterNextRender(() => {
      //console.log('anytime anything is next rendered APP WIDE');
    });
  }

  @HostListener('mouseenter') onMouseEnter() {
    //console.log('Control mouseenter');
  }

  // getting hold of projected content
  @ContentChild('input') private content?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;

  // signal alternative
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  onClick() {
    //console.log('Control clicked');
    //console.log(this.el);
    //console.log('Content:', this.content?.nativeElement.value);
    //console.log('Content Control signal:', this.control()?.nativeElement.value);
  }
}
