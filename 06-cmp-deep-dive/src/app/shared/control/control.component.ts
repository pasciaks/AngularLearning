import {
  Component,
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
export class ControlComponent {
  // @Input() label: string;
  label = input.required<string>();

  private el = inject(ElementRef); // access to the host element

  // below works instead of host binding but is not recommended
  // @HostBinding('class') className = 'control';

  @HostListener('mouseenter') onMouseEnter() {
    console.log('Control mouseenter');
  }

  onClick() {
    console.log('Control clicked');
    console.log(this.el);
  }
}
