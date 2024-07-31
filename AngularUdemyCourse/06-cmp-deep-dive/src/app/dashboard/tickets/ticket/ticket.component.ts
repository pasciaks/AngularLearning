import { Component, input, Input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  // @Input() data!: Ticket;
  // data = input.required<Ticket>({ transform: (value) => value });

  // data = input.required<Ticket>({ alias: 'data' });
  data = input.required<Ticket>();

  detailsVisible = signal(false);

  // close = output({ alias: 'close' });
  close = output();

  onToggleDetails() {
    this.detailsVisible.update((wasVisible) => {
      return !wasVisible;
    });
    // this.detailsVisible.set(!this.detailsVisible());
  }

  onMarkAsCompleted() {
    this.close.emit();
  }

  onRemove(ticket: Ticket) {
    console.log('TicketComponent remove:', ticket);
  }
}
