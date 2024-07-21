import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  viewChild,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, FormsModule, ButtonComponent],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') formElement?: ElementRef<HTMLFormElement>;

  @ViewChildren(ControlComponent) controlComponents?: ControlComponent[];

  ngOnInit(): void {
    // NOTE: view child elements are NOT available here
  }

  ngAfterViewInit(): void {
    // view child elements are available here
    console.log('NewTicketComponent after view init');
  }

  // alternative to ViewChild
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  private formElRequired =
    viewChild.required<ElementRef<HTMLFormElement>>('form');

  isDisabled: boolean = false;
  onSubmit(
    titleElement: HTMLInputElement,
    requestElement: HTMLTextAreaElement,
    btn: ButtonComponent
  ) {
    console.log('Form submitted');
    console.log('Title:', titleElement.value);
    console.log('Request:', requestElement.value);

    this.isDisabled = true;

    console.log('Button:', btn);

    setTimeout(() => {
      this.formElement?.nativeElement.reset();
      this.isDisabled = false;

      // alternative to ViewChild (protect against undefined)
      this.formEl()?.nativeElement.reset();
      // alternative to ViewChild (required)
      this.formElRequired().nativeElement.reset();
    }, 2000);
  }
}
