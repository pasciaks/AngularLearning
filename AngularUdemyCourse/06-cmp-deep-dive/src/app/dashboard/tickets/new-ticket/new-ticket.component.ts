import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  output,
  Output,
  viewChild,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, FormsModule, ButtonComponent],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // @Output() add = new EventEmitter<Ticket>();
  add = output<{ title: string; request: string }>();

  @ViewChild('form') formElement?: ElementRef<HTMLFormElement>;

  @ViewChildren(ControlComponent) controlComponents?: ControlComponent[];

  enteredTitle: string = '';
  enteredText: string = '';

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
    // using two way binding
    console.log(this.enteredText);
    console.log(this.enteredTitle);

    // console.log('Form submitted');
    // console.log('Title:', titleElement.value);
    // console.log('Request:', requestElement.value);

    this.isDisabled = true;

    // console.log('Button:', btn);

    // this.formElement?.nativeElement.reset();
    this.isDisabled = false;

    console.log({
      title: titleElement.value,
      request: requestElement.value,
    });

    this.add.emit({
      title: titleElement.value,
      request: requestElement.value,
    });

    this.enteredText = '';
    this.enteredTitle = '';

    // alternative to ViewChild (protect against undefined)
    this.formEl()?.nativeElement.reset();
    // alternative to ViewChild (required)
    this.formElRequired().nativeElement.reset();
  }
}
